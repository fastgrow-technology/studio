
'use client';
import { deleteQuoteSubmission } from '@/lib/actions';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <Button variant="ghost" size="icon" className="text-destructive" disabled={isPending}>
        <Trash className="size-4" />
      </Button>
    </DeleteConfirmationDialog>
  );
}
