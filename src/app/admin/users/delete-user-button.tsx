
'use client';
import { deleteUser } from '@/lib/actions/users';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function DeleteUserButton({ userId, isCurrentUser }: { userId: string, isCurrentUser: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteUser(userId);
    });
  };

  return (
    <DeleteConfirmationDialog
      onDelete={handleDelete}
      itemName={`user account`}
      disabled={isCurrentUser || isPending}
    >
      <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        disabled={isCurrentUser}
        className="text-destructive"
      >
        Delete
      </DropdownMenuItem>
    </DeleteConfirmationDialog>
  );
}
