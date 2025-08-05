'use client';
import { deleteTestimonial } from '@/lib/actions';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { Trash } from 'lucide-react';

export function DeleteTestimonialButton({ testimonialId }: { testimonialId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTestimonial(testimonialId);
    });
  };

  return (
    <DeleteConfirmationDialog
      onDelete={handleDelete}
      itemName={`testimonial #${testimonialId}`}
    >
      <button className="w-full text-left relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-destructive data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
      </button>
    </DeleteConfirmationDialog>
  );
}
