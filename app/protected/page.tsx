import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import  Table  from "@/components/table";
import { FileUploadDemo } from "@/components/file-upload-demo";
import { DialogExample } from "@/components/dialog-example";

export default async function ProtectedPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h2 className="font-bold text-2xl mb-4">Files</h2>
          <div className="w-full flex flex-row-reverse">
            <DialogExample/>
          </div>
          
        </div>
        
        {/* <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(file_data, null, 2)}
        </pre> */}
        <Table/>
      </div>
      {/* <div className="justify-items-center">
        <FileUploadDemo/>
      </div> */}
    </div>
  );
}
