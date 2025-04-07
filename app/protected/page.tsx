import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import  Table  from "@/components/table";
import { FileUploadDemo } from "@/components/file-upload-demo";

export default async function ProtectedPage() {
  const supabase = await createClient();

 const deleteTodo  = async(file_id: number, file_name: string) => {
  try {
    //remove from storage bucket
    await supabase
    .storage
    .from('file_bucket')
    .remove(['public/'+file_name])
    //remove from table
   await supabase
      .from('todos')
      .delete()
      .eq('id', file_id )
    
  } catch (error) {
    console.log('error', error)
  }
}
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div>
        <h2 className="font-bold text-2xl mb-4">Files</h2>
        {/* <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(file_data, null, 2)}
        </pre> */}
        <Table/>
        <FileUploadDemo/>
      </div>
    </div>
  );
}
