import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import  Table  from "@/components/table";
import { DialogExample } from "@/components/dialog-example";
import { ToastProvider } from "@/components/toast-provider";
import ProtectedPageClient from "@/components/protected-page-client";


export default async function ProtectedPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex w-full flex flex-col gap-12">
      {/* <ToastProvider />
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h2 className="font-bold text-2xl mb-4">Files</h2>
          <div className="w-full flex flex-row-reverse">
            <DialogExample/>
          </div>
        </div>
        <Table/>
      </div> */}
      <ProtectedPageClient toastMessage={"Welcome back " + user.email + "!"} />
    </div>
  );
}
