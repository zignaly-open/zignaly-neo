import { toast } from 'react-toastify';
import { Toaster } from '@zignaly-open/ui';
import React from 'react';

type ToastFn = (text: string) => void;

export function useToast(): {
  success: ToastFn;
  error: ToastFn;
} {
  const showToast = (message: string, type: 'success' | 'error') =>
    toast(<Toaster variant={type} caption={message} />, {
      type: type,
      icon: false,
    });
  return {
    success: (message) => showToast(message, 'success'),
    error: (message) => showToast(message, 'error'),
  };
}
