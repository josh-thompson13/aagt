'use client';

import { useState, useEffect } from 'react';
import { Code, Copy, ExternalLink } from 'lucide-react';
import { LoanCalculator } from './LoanCalculator';

interface Props {
  onWidgetGenerated?: (embedCode: string) => void;
}

export function EmbeddableWidget({ onWidgetGenerated }: Props) {
  const [widgetConfig, setWidgetConfig] = useState({
    variant: 'compact' as 'compact' | 'embedded',
    theme: 'light' as 'light' | 'dark',
    width: '100%',
    height: '600px',
    showComparison: true,
    showCharts: false,
    primaryColor: '#0A2540',
    accentColor: '#0891B2'
  });
  
  const [embedCode, setEmbedCode] = useState('');
  const [previewMode, setPreviewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateEmbedCode();
  }, [widgetConfig]);

  const generateEmbedCode = () => {
    const config = encodeURIComponent(JSON.stringify(widgetConfig));
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://aagtprivateloans.com.au';
    
    const iframe = `<iframe 
  src="${baseUrl}/calculator/widget?config=${config}"
  width="${widgetConfig.width}"
  height="${widgetConfig.height}"
  frameborder="0"
  scrolling="no"
  style="border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
  title="AAGT Private Loans Calculator">
</iframe>`;

    setEmbedCode(iframe);
    onWidgetGenerated?.(iframe);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleConfigChange = (key: keyof typeof widgetConfig, value: any) => {
    setWidgetConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Embeddable Calculator Widget</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Widget Configuration</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Widget Variant
                  </label>
                  <select
                    value={widgetConfig.variant}
                    onChange={(e) => handleConfigChange('variant', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="compact">Compact (Minimal UI)</option>
                    <option value="embedded">Embedded (Simplified)</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width
                    </label>
                    <input
                      type="text"
                      value={widgetConfig.width}
                      onChange={(e) => handleConfigChange('width', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="100%, 400px, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height
                    </label>
                    <input
                      type="text"
                      value={widgetConfig.height}
                      onChange={(e) => handleConfigChange('height', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="600px, 100vh, etc."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={widgetConfig.theme === 'light'}
                        onChange={(e) => handleConfigChange('theme', e.target.value)}
                        className="mr-2"
                      />
                      Light
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={widgetConfig.theme === 'dark'}
                        onChange={(e) => handleConfigChange('theme', e.target.value)}
                        className="mr-2"
                      />
                      Dark
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      value={widgetConfig.primaryColor}
                      onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accent Color
                    </label>
                    <input
                      type="color"
                      value={widgetConfig.accentColor}
                      onChange={(e) => handleConfigChange('accentColor', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={widgetConfig.showComparison}
                      onChange={(e) => handleConfigChange('showComparison', e.target.checked)}
                      className="mr-2"
                    />
                    Show Bank Comparison
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={widgetConfig.showCharts}
                      onChange={(e) => handleConfigChange('showCharts', e.target.checked)}
                      className="mr-2"
                    />
                    Show Charts (requires more height)
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preview/Code Panel */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewMode('preview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  previewMode === 'preview'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setPreviewMode('code')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  previewMode === 'code'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Embed Code
              </button>
            </div>
            
            {previewMode === 'preview' ? (
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 border-b border-gray-300">
                  Widget Preview
                </div>
                <div 
                  className="p-4 bg-white overflow-auto"
                  style={{ height: '400px' }}
                >
                  <div style={{ 
                    width: widgetConfig.width === '100%' ? '100%' : widgetConfig.width,
                    height: '350px',
                    transform: 'scale(0.8)',
                    transformOrigin: 'top left'
                  }}>
                    <LoanCalculator variant={widgetConfig.variant} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-auto max-h-96">
                  <pre>{embedCode}</pre>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h5 className="font-medium text-gray-900 mb-3">Integration Instructions</h5>
          <div className="space-y-2 text-sm text-gray-600">
            <p>1. Copy the embed code above</p>
            <p>2. Paste it into your website's HTML where you want the calculator to appear</p>
            <p>3. The calculator will automatically load and be fully functional</p>
            <p>4. Customize colors and features using the configuration panel</p>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h6 className="font-medium text-blue-900">Need Help?</h6>
                <p className="text-sm text-blue-800 mt-1">
                  Contact our technical team for assistance with integration or custom styling options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}