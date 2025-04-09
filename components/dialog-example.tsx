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
      </Dialog>
    </>
  );
}