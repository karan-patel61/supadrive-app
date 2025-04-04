import { createClient } from "@/utils/supabase/server";
import { Download, InfoIcon, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import  Table  from "@/components/table";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const file_data = await supabase
  .from('todos')
  .select('*')
  .order('id', { ascending: true })

  function bytesToSize(bytes:number) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
 }
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

 
  const listFiles = file_data.data?.map(file =>
    <tr key={file.id} className='bg-blur-sm text-center text-zinc-400 transition ease-in-out hover:text-white hover:bg-purple-700/10 duration-500 border-b-2 border-neutral-100/30 hover:shadow-lg'>
        <td>{file.file_name}</td>
        <td>{file.inserted_at}</td>
        <td className='w-1/6'>{bytesToSize(file.file_size?file.file_size:0)}</td>
        <td className='overflow-x w-1/4 sm:w-1/5 align-center justify-center'>
          <button className='rounded-md p-1 mt-1'> <Trash/></button>
          <form action={"/api/download/"+file.file_name} method="get" className='inline'>              
            <button id='download' type='submit' className='rounded-md p-1'> <Download/></button>
          </form>
        </td>
      </tr>
  );

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
      </div>
    </div>
  );
}
