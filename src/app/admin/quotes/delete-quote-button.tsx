
'use client';
import { deleteQuoteSubmission } from '@/lib/actions';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { Trash } from 'lucide-react';

export function DeleteQuoteButton({ submissionId }: { submissionId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteQuoteSubmission(submissionId);
    });
  };

  return (
    <DeleteConfirmationDialog
      onDelete={handleDelete}
      itemName={`quote submission #${submissionId}`}
    >
      <button className="text-destructive flex items-center gap-2">
        <Trash className="size-4" />
        <span>Delete</span>
      </button>
    </DeleteConfirmationDialog>
  );
}
