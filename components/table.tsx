'use client'
import { createClient } from "@/utils/supabase/client";
import { Download, Trash } from "lucide-react";
import { useEffect, useState } from "react";

type Todos = {
  id: number;
  file_name: string;
  inserted_at: string;
  file_size: number;

}

export default function Table() {

    const [todos, setTodos] = useState<Todos[]>([])
    const [fetching, setFetching] = useState(false)
    const supabase = createClient();
    const  user = supabase.auth.getUser();

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

    useEffect(() => {
      const fetchTodos = async () => {
        setFetching(true)
        const { data: todos, error } = await supabase
          .from('todos')
          .select('*')
          .eq('user_id',(await user).data.user?.id)
          .order('id', { ascending: true })
  
        if (error) console.log('error', error)
        else {
          setFetching(false)
          setTodos(todos)
        }
      }
      
      setTimeout(()=>{
        fetchTodos()
       }, 1000)
      
    }, [todos])
    
      function bytesToSize(bytes:number) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
     }

     const listFiles = todos.map(file =>
        <tr key={file.id} className='bg-blur-sm text-center text-primary transition ease-in-out hover:bg-purple-700/20 duration-500 border-b-2 border-neutral-100/30 hover:shadow-lg'>
            <td>{file.file_name}</td>
            <td>{file.inserted_at}</td>
            <td className='w-1/6'>{bytesToSize(file.file_size?file.file_size:0)}</td>
            <td className='overflow-x w-1/4 sm:w-1/5 align-center justify-center'>
              <button className='rounded-md p-1 mt-1 transition ease-in-out hover:bg-gray-700/20 duration-500 dark:hover:bg-fuchsia-50/30' onClick={e => deleteTodo(file.id, file.file_name)} > <Trash/></button>
              <form action={"/api/download/"+file.file_name} method="get" className='inline'>              
                <button id='download' type='submit' className='rounded-md p-1 transition ease-in-out hover:bg-gray-700/20 duration-500 dark:hover:bg-fuchsia-50/30'> <Download/></button>
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