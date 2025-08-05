
'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { CheckCircle, Info, Loader2 } from 'lucide-react';

import { submitContactForm } from '@/lib/actions';
import { contactFormSchema, type ContactFormState } from '@/lib/validators';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Service } from '@/lib/types';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const initialState: ContactFormState = {
  message: '',
};

export function ContactForm() {
  const [formState, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [showDialog, setShowDialog] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createSupabaseBrowserClient();
      const { data } = await supabase.from('services').select('slug, title');
      if (data) {
        setServices(data);
      }
    };
    fetchServices();
  }, []);

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  useEffect(() => {
    if (formState.message.startsWith('Success')) {
      setShowDialog(true);
      form.reset();
    } else if (formState.message.startsWith('Error')) {
      toast({
        title: 'Submission Error',
        description: formState.message,
        variant: 'destructive',
      });
    }
  }, [formState, form, toast]);

  return (
    <>
      <Form {...form}>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service of Interest</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.slug} value={service.title}>{service.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="How can we help you?" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </Form>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center">
              <CheckCircle className="size-16 text-green-500" />
            </div>
            <AlertDialogTitle className="text-center">Query Submitted & Routed!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your inquiry has been successfully submitted. Our AI has routed it to the appropriate department to ensure a swift response.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {formState.data && (
            <div className="rounded-lg border bg-muted p-4 text-sm">
              <h4 className="font-semibold">Routing Details:</h4>
              <p><strong>Department:</strong> {formState.data.department}</p>
              {formState.data.agent && <p><strong>Agent:</strong> {formState.data.agent}</p>}
              <p className="mt-2 text-xs italic text-muted-foreground flex gap-2">
                <Info className="size-4 shrink-0" />
                <span>{formState.data.reason}</span>
              </p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowDialog(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
