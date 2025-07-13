"use client";
import toast from "react-hot-toast";

type SnackbarType = "success" | "error" | "info";

export function useSnackbar() {
  return (message: string, type: SnackbarType = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
      default:
        toast(message);
        break;
    }
  };
}