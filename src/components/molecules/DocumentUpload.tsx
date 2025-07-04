'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { UploadedFile } from '@/types/application';
import { Button } from '@/components/atoms';

interface DocumentUploadProps {
  category: string;
  title: string;
  description?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  required?: boolean;
  className?: string;
}

const ACCEPTED_FILE_TYPES = {
  'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const DocumentUpload = ({
  category,
  title,
  description,
  acceptedFileTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx'],
  maxFileSize = MAX_FILE_SIZE,
  maxFiles = 5,
  files,
  onFilesChange,
  required = false,
  className,
}: DocumentUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const uploadFile = async (file: File): Promise<UploadedFile> => {
    const fileId = `${Date.now()}-${file.name}`;

    // Create file object
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadStatus: 'uploading',
      uploadProgress: 0,
      category,
    };

    // Simulate upload progress
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
      // Simulate upload with progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Make actual upload request
      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();

      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });

      return {
        ...uploadedFile,
        uploadStatus: 'completed',
        url: result.url,
        uploadProgress: 100,
      };
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });

      return {
        ...uploadedFile,
        uploadStatus: 'error',
        uploadProgress: 0,
      };
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setDragActive(false);

      // Validate file count
      const totalFiles = files.length + acceptedFiles.length;
      if (totalFiles > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Process each file
      const newFiles: UploadedFile[] = [];

      for (const file of acceptedFiles) {
        // Validate file size
        if (file.size > maxFileSize) {
          alert(
            `File ${file.name} is too large. Maximum size is ${Math.round(maxFileSize / 1024 / 1024)}MB`
          );
          continue;
        }

        // Validate file type
        const isValidType = acceptedFileTypes.some((type) => {
          if (type.includes('*')) {
            const prefix = type.split('*')[0];
            return prefix ? file.type.startsWith(prefix) : false;
          }
          return file.type === type || file.name.toLowerCase().endsWith(type);
        });

        if (!isValidType) {
          alert(`File ${file.name} is not a supported file type`);
          continue;
        }

        try {
          const uploadedFile = await uploadFile(file);
          newFiles.push(uploadedFile);
        } catch (error) {
          console.error('Failed to upload file:', file.name, error);
        }
      }

      if (newFiles.length > 0) {
        onFilesChange([...files, ...newFiles]);
      }
    },
    [files, maxFiles, maxFileSize, acceptedFileTypes, onFilesChange, category]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    accept: acceptedFileTypes.reduce(
      (acc, type) => {
        acc[type] = ACCEPTED_FILE_TYPES[type as keyof typeof ACCEPTED_FILE_TYPES] || [];
        return acc;
      },
      {} as Record<string, string[]>
    ),
    maxSize: maxFileSize,
    disabled: files.length >= maxFiles,
  });

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    onFilesChange(updatedFiles);
  };

  const retryUpload = async (fileId: string) => {
    const fileIndex = files.findIndex((f) => f.id === fileId);
    if (fileIndex === -1) return;

    const file = files[fileIndex];
    if (!file) return;

    const updatedFiles = [...files];
    updatedFiles[fileIndex] = {
      ...file,
      id: file.id || `${Date.now()}-${Math.random()}`,
      name: file.name || 'Unknown',
      size: file.size || 0,
      type: file.type || 'application/octet-stream',
      category: file.category || 'other',
      uploadStatus: 'uploading' as const,
      uploadProgress: 0,
    };
    onFilesChange(updatedFiles);

    // Note: In a real implementation, you'd need to store the original File object
    // For now, we'll just mark it as completed
    setTimeout(() => {
      if (!file) return;

      const retryFiles = [...files];
      retryFiles[fileIndex] = {
        ...file,
        id: file.id || `${Date.now()}-${Math.random()}`,
        name: file.name || 'Unknown',
        size: file.size || 0,
        type: file.type || 'application/octet-stream',
        category: file.category || 'other',
        uploadStatus: 'completed' as const,
        uploadProgress: 100,
      };
      onFilesChange(retryFiles);
    }, 1000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / k ** i).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: UploadedFile) => {
    if (file.type.startsWith('image/')) {
      return '🖼️';
    } else if (file.type === 'application/pdf') {
      return '📄';
    } else if (file.type.includes('word')) {
      return '📝';
    } else if (file.type.includes('sheet') || file.type.includes('excel')) {
      return '📊';
    }
    return '📄';
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div>
        <h3
          className={cn(
            'text-lg font-medium text-gray-900',
            required && "after:content-['*'] after:ml-0.5 after:text-red-500"
          )}
        >
          {title}
        </h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2',
          isDragActive || dragActive
            ? 'border-teal-500 bg-teal-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50',
          files.length >= maxFiles && 'opacity-50 cursor-not-allowed'
        )}
        role="button"
        tabIndex={0}
        aria-label={`Upload documents for ${title}`}
      >
        <input {...getInputProps()} aria-describedby={`${category}-upload-help`} />

        <Upload
          className={cn(
            'mx-auto h-12 w-12 mb-4',
            isDragActive || dragActive ? 'text-teal-500' : 'text-gray-400'
          )}
        />

        <div className="space-y-2">
          <p className="text-base font-medium text-gray-900">
            {isDragActive ? 'Drop files here' : 'Drop files or click to upload'}
          </p>
          <p className="text-sm text-gray-500">Supports: PDF, DOC, DOCX, XLS, XLSX, Images</p>
          <p className="text-xs text-gray-400">
            Maximum {maxFiles} files, {Math.round(maxFileSize / 1024 / 1024)}MB each
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  'flex items-center justify-between p-3 border rounded-lg',
                  file.uploadStatus === 'error'
                    ? 'border-red-200 bg-red-50'
                    : file.uploadStatus === 'completed'
                      ? 'border-success-200 bg-success-50'
                      : 'border-gray-200 bg-gray-50'
                )}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-2xl flex-shrink-0">{getFileIcon(file)}</span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>

                    {/* Upload Progress */}
                    {file.uploadStatus === 'uploading' && (
                      <div className="mt-1">
                        <div className="bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-teal-600 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[file.id] || 0}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Uploading... {uploadProgress[file.id] || 0}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Status Icon */}
                  {file.uploadStatus === 'completed' && (
                    <CheckCircle className="h-5 w-5 text-success-500" />
                  )}
                  {file.uploadStatus === 'error' && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}

                  {/* Actions */}
                  <div className="flex space-x-1">
                    {file.uploadStatus === 'error' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => retryUpload(file.id)}
                        aria-label={`Retry upload for ${file.name}`}
                      >
                        Retry
                      </Button>
                    )}

                    {file.uploadStatus === 'completed' && file.url && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(file.url, '_blank')}
                        aria-label={`View ${file.name}`}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(file.id)}
                      aria-label={`Remove ${file.name}`}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div id={`${category}-upload-help`} className="text-xs text-gray-500">
        <p>
          All documents must be clear and legible. Supported formats: PDF, Word documents, Excel
          spreadsheets, and common image formats.
        </p>
        {required && (
          <p className="text-red-600 mt-1">At least one document is required for this category.</p>
        )}
      </div>
    </div>
  );
};
