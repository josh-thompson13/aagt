'use client';

import { useState } from 'react';
import { Save, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/atoms';

interface SaveProgressProps {
  isAutoSaving?: boolean;
  lastSaved?: string;
  hasUnsavedChanges?: boolean;
  onSave?: () => Promise<void>;
  saveError?: string | null;
  className?: string;
}

export const SaveProgress = ({
  isAutoSaving = false,
  lastSaved,
  hasUnsavedChanges = false,
  onSave,
  saveError,
  className,
}: SaveProgressProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleManualSave = async () => {
    if (!onSave || isSaving) return;

    setIsSaving(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Manual save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatLastSaved = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
      } else {
        return date.toLocaleDateString();
      }
    }
  };

  const getStatusIcon = () => {
    if (isAutoSaving || isSaving) {
      return (
        <div className="animate-spin h-4 w-4 text-teal-600">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="opacity-25"
            />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              className="opacity-75"
            />
          </svg>
        </div>
      );
    }
    
    if (saveError) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    
    if (hasUnsavedChanges) {
      return <Clock className="h-4 w-4 text-amber-500" />;
    }
    
    return <CheckCircle className="h-4 w-4 text-success-500" />;
  };

  const getStatusText = () => {
    if (isAutoSaving) {
      return 'Auto-saving...';
    }
    
    if (isSaving) {
      return 'Saving...';
    }
    
    if (saveError) {
      return `Save failed: ${saveError}`;
    }
    
    if (hasUnsavedChanges) {
      return 'Unsaved changes';
    }
    
    if (lastSaved) {
      return `Saved ${formatLastSaved(lastSaved)}`;
    }
    
    return 'No changes to save';
  };

  return (
    <div className={cn('flex items-center justify-between p-3 bg-gray-50 rounded-lg border', className)}>
      {/* Status Information */}
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        
        <div className="flex flex-col">
          <span
            className={cn(
              'text-sm font-medium',
              saveError ? 'text-red-700' :
              hasUnsavedChanges ? 'text-amber-700' :
              'text-gray-700'
            )}
          >
            {getStatusText()}
          </span>
          
          {/* Auto-save info */}
          {!saveError && (
            <span className="text-xs text-gray-500">
              Changes are automatically saved every 30 seconds
            </span>
          )}
        </div>
      </div>

      {/* Manual Save Button */}
      {(hasUnsavedChanges || saveError) && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleManualSave}
          disabled={isSaving || isAutoSaving}
          className="ml-4"
        >
          <Save className="h-4 w-4 mr-1" />
          {isSaving ? 'Saving...' : 'Save Now'}
        </Button>
      )}
    </div>
  );
};