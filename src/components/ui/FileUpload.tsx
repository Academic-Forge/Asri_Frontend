import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploadProps {
  label: string;
  id: string;
  error?: string;
  accept?: string;
  onChange: (file: File | null) => void;
  value?: File | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  id,
  error,
  accept = 'image/*,application/pdf',
  onChange,
  value,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Generate image preview URL if file is an image
  useEffect(() => {
    if (!value) {
      const timer = setTimeout(() => setPreviewUrl(null), 0);
      return () => clearTimeout(timer);
    }

    if (value.type.startsWith('image/')) {
      const url = URL.createObjectURL(value);
      const timer = setTimeout(() => setPreviewUrl(url), 0);
      return () => {
        clearTimeout(timer);
        URL.revokeObjectURL(url);
      };
    } else {
      const timer = setTimeout(() => setPreviewUrl(null), 0);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      
      <div
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer min-h-[140px] ${
          dragActive
            ? 'border-secondary bg-secondary/5 scale-[1.01]'
            : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50 hover:border-slate-300'
        } ${error ? 'border-rose-500 bg-rose-50/20' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />

        {value ? (
          <div className="flex flex-col items-center text-center w-full relative z-10">
            {previewUrl ? (
              <div className="relative mb-3 group">
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="h-20 w-20 object-cover rounded-xl shadow-md border border-slate-100 transition-transform group-hover:scale-105 duration-200"
                />
                <button
                  type="button"
                  onClick={clearFile}
                  className="absolute -top-1.5 -right-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 shadow-md transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="relative mb-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-primary">
                <FileText size={28} />
                <button
                  type="button"
                  onClick={clearFile}
                  className="absolute -top-1.5 -right-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 shadow-md transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            
            <p className="text-sm font-bold text-slate-800 line-clamp-1 max-w-[220px]">
              {value.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {(value.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 group-hover:text-primary transition-colors duration-200 mb-3 border border-slate-100">
              <Upload size={20} className="text-slate-500" />
            </div>
            <p className="text-sm font-bold text-slate-700">
              Pilih file atau seret ke sini
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Format: JPG, PNG, PDF (Maks. 5MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs text-rose-600 font-semibold animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
