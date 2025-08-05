'use client';
import { deleteBlogPost } from '@/lib/actions';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';

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
      <span className="text-destructive w-full text-left">Delete</span>
    </DeleteConfirmationDialog>
  );
}
