import { createClient } from "@/utils/supabase/server";
import { Download, Trash } from "lucide-react";

export default async function Table() {

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

      const file_data = await supabase
      .from('todos')
      .select('*')
      .eq('user_id',user?.id)
    
      function bytesToSize(bytes:number) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
     }

     const listFiles = file_data.data?.map(file =>
        <tr key={file.id} className='bg-blur-sm text-center text-primary transition ease-in-out hover:bg-purple-700/20 duration-500 border-b-2 border-neutral-100/30 hover:shadow-lg'>
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


    return (
        <div className="w-full flex flex-col">
            <table className="table-auto overflow-auto items-center rounded-md w-full">
              <thead className='border-b border-white text-purple-700 hover:shadow-gray-100'>
                  <tr className='border-purple-900 border-5 font-bold'>
                  <th className='rounded-tl-md'>File Name</th>
                  <th className=''>Upload Date</th>
                  <th className=''>Size</th>
                  <th className='rounded-tr-md'>Actions</th>
                  </tr>
              </thead>
              <tbody className=''>
                { listFiles }
              </tbody>
            </table>
        </div>
    )
}