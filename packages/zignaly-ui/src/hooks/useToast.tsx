import { toast, ToastOptions } from "react-toastify";
import React from "react";
import Toaster from "components/display/Toaster";
export { ToastContainer } from "react-toastify";

export const showZigToast =
  (type: "success" | "error" | "info") => (message: string, options?: ToastOptions) =>
    toast(<Toaster variant={type} caption={message} id={type && `toast__${type}`} />, {
      type: type,
      icon: false,
      ...options,
    } as ToastOptions);

export function useToast(): {
  success: (message: string, options?: ToastOptions) => number | string;
  error: (message: string, options?: ToastOptions) => number | string;
  info: (message: string, options?: ToastOptions) => number | string;
} {
  return {
    success: showZigToast("success"),
    error: showZigToast("error"),
    info: showZigToast("info"),
  };
}
