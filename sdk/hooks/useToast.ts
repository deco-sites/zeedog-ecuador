import { toasts } from "$sdk/global/signalStore.ts";
import { AvailableLazyIcons } from "$components/ui/LazyIcon.tsx";

type Position = "top-right" | "top-left";
type Type = "success" | "error" | "warning" | "black";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export interface ToastProps {
  message: string;
  button?: ButtonProps;
  position?: Position;
  type?: Type;
  autoClose?: number;
  icon?: AvailableLazyIcons;
  closeButton?: boolean;
}

export interface ToastState extends ToastProps {
  id: number;
}

const addToast = ({
  message,
  button,
  position,
  type,
  autoClose,
  icon,
  closeButton,
}: ToastProps) => {
  toasts.value = [
    ...toasts.value,
    {
      id: Date.now(),
      message,
      button,
      position,
      type,
      autoClose,
      icon,
      closeButton,
    },
  ];
};

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

const state = {
  toasts,
  addToast,
  removeToast,
};

export const useToast = () => state;
