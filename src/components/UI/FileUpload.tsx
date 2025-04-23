import React, { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import Button from './Button';

interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  onChange: (file: File | null) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Upload a file',
  accept = '*/*',
  maxSize = 5, // Default 5MB
  onChange,
  error,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [sizeError, setSizeError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile: File): boolean => {
    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setSizeError(`File size exceeds ${maxSize}MB`);
      return false;
    }
    
    setSizeError('');
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onChange(selectedFile);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onChange(selectedFile);
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    setFile(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-4 transition-colors
          ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
          ${error || sizeError ? 'border-red-300' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        
        {!file ? (
          <div className="text-center p-6">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm text-gray-600">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClick}
              >
                Choose a file
              </Button>
              <p className="pl-1 text-gray-500 mt-2">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {accept === '.pdf' ? 'PDF' : accept.replace(/\./g, '').toUpperCase()} up to {maxSize}MB
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button 
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              leftIcon={<X size={16} />}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
      
      {(error || sizeError) && (
        <p className="mt-1 text-sm text-red-600">{error || sizeError}</p>
      )}
    </div>
  );
};

export default FileUpload;