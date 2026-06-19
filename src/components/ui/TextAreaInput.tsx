import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  id,
  error,
  register,
  className = '',
  rows = 3,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={`w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 ${
          error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10' : ''
        }`}
        {...register}
        {...props}
      />
      {error && (
        <span className="text-xs text-rose-600 font-semibold animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextAreaInput;
