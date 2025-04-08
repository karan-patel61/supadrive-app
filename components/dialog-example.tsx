// components/DialogExample.tsx
'use client';

import { useState } from 'react';
import { Dialog } from '@/components/dialog';
import { Button } from '@/components/ui/button'; // Your button component
import { FileUploadDemo } from './file-upload-demo';

export function DialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>+ Upload File</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Upload File"
      >
        <FileUploadDemo/>
        <div className="flex justify-end space-x-2 mt-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert('Action confirmed!');
              setIsOpen(false);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Confirm
          </button>
        </div>
      </Dialog>
    </>
  );
}