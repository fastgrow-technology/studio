
'use client';
import { resendInvite } from '@/lib/actions/users';
import { useTransition } from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function ResendInviteButton({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleResend = () => {
    startTransition(async () => {
      const result = await resendInvite(email);
      if (result.success) {
        toast({ title: 'Success', description: result.message });
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' });
      }
    });
  };

  return (
    <DropdownMenuItem onClick={handleResend} disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 animate-spin" />
          Sending...
        </>
      ) : (
        'Resend Invite'
      )}
    </DropdownMenuItem>
  );
}
