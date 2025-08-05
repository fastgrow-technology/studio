'use client';
import { deleteBlogPost } from '@/lib/actions';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Trash } from 'lucide-react';

export function DeleteBlogPostButton({ postId }: { postId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteBlogPost(postId);
    });
  };

  return (
    <DeleteConfirmationDialog
      onDelete={handleDelete}
      itemName={`blog post #${postId}`}
    >
      <button className="w-full text-left relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-destructive data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
      </button>
    </DeleteConfirmationDialog>
  );
}
