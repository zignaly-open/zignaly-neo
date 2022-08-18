import { Toaster } from '@zignaly-open/ui';
import { ToasterProps } from '@zignaly-open/ui/lib/components/display/Toaster/types';
import React from 'react';
import toast from 'react-hot-toast';

export const showToast = async ({ variant, caption, size }: ToasterProps) => {
  toast.custom(<Toaster variant={variant} caption={caption} size={size} />, {
    id: 'toast',
  });

  const interval = setInterval(() => {
    toast.remove('toast');
    clearInterval(interval);
  }, 4000);
};
