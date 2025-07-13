"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ToastProvider } from "@/components/toast-provider";
import Table from "@/components/table";
import { DialogExample } from "@/components/dialog-example";

export default function ProtectedPageClient({ toastMessage }: { toastMessage: string }) {
  useEffect(() => {
    toast.success(toastMessage);
  }, [toastMessage]);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <ToastProvider />
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h2 className="font-bold text-2xl mb-4">Files</h2>
          <div className="w-full flex flex-row-reverse">
            <DialogExample />
          </div>
        </div>
        <Table />
      </div>
    </div>
  );
}