
'use client';

import { useActionState } from 'react';
import { subscribeToNewsletter } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

const initialState = {
  message: '',
  success: false,
};

export function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <Input
        type="email"
        name="email"
        placeholder="Enter your email address"
        required
        className="flex-grow text-base"
      />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useActionState(subscribeToNewsletter, initialState);
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      Subscribe
    </Button>
  );
}
