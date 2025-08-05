
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { inviteUser } from '@/lib/actions/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 animate-spin" />}
      Send Invitation
    </Button>
  );
}

export function InviteUserForm() {
  const [state, formAction] = useFormState(inviteUser, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.message.startsWith('Error:')) {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite New User</CardTitle>
        <CardDescription>Invite a new user to access the admin panel.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input type="email" id="email" name="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select name="role" defaultValue="editor">
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
