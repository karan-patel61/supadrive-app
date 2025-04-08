// components/DialogExample.tsx
'use client';

import { useState } from 'react';
import { Dialog } from '@/components/dialog';
import { Button } from '@/components/ui/button'; // Your button component

export function DialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>+</Button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Upload File"
      >
        <p className="mb-4">This is the content of your dialog. You can put any React components here.</p>
        <div className="flex justify-end space-x-2">
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