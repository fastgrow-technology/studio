'use client';
import { deleteTeamMember } from '@/lib/actions';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';

export function DeleteTeamMemberButton({ memberId }: { memberId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTeamMember(memberId);
    });
  };

  return (
    <DeleteConfirmationDialog
      onDelete={handleDelete}
      itemName={`team member #${memberId}`}
    >
      <span className="text-destructive w-full text-left">Delete</span>
    </DeleteConfirmationDialog>
  );
}
