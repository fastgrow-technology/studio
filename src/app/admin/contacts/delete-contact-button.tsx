'use client';
import { deleteContactSubmission } from '@/lib/actions';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { Trash } from 'lucide-react';

export function DeleteContactButton({ submissionId }: { submissionId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteContactSubmission(submissionId);
    });
  };

  return (
    <DeleteConfirmationDialog
      onDelete={handleDelete}
      itemName={`contact submission #${submissionId}`}
    >
      <button className="text-destructive flex items-center gap-2">
        <Trash className="size-4" />
        <span>Delete</span>
      </button>
    </DeleteConfirmationDialog>
  );
}
