import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  icon?: React.ReactNode;
  register?: UseFormRegisterReturn;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  error,
  icon,
  register,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors duration-200">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          className={`w-full py-3.5 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 ${
            icon ? 'pl-12' : 'px-5'
          } ${
            error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10' : ''
          }`}
          {...register}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-rose-600 font-semibold animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
