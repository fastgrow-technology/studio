'use client';
import { deleteService } from '@/lib/actions';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';

export function DeleteServiceButton({ serviceId }: { serviceId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteService(serviceId);
    });
  };

  return (
    <DeleteConfirmationDialog
      onDelete={handleDelete}
      itemName={`service #${serviceId}`}
    >
       <span className="w-full text-left">Delete</span>
    </DeleteConfirmationDialog>
  );
}
