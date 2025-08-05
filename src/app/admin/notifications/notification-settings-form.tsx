'use client';

import { updateSiteSettings } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface NotificationSettingsFormProps {
    initialSettings: Record<string, string>;
}

export function NotificationSettingsForm({ initialSettings }: NotificationSettingsFormProps) {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <form action={updateSiteSettings} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure your SMTP server to receive email notifications for form submissions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4 rounded-md border p-4">
               <div className="space-y-2">
                <Label htmlFor="notification_recipient_email">Recipient Email Address</Label>
                 <Input id="notification_recipient_email" name="notification_recipient_email" type="email" placeholder="you@example.com" defaultValue={initialSettings['notification_recipient_email']} />
                <p className="text-sm text-muted-foreground">The email address where submission notifications will be sent.</p>
              </div>
            </div>
            
            <div className="space-y-4">
                <h3 className="text-lg font-medium">SMTP Configuration</h3>
                <div className="space-y-4 rounded-md border p-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="smtp_host">SMTP Host</Label>
                            <Input id="smtp_host" name="smtp_host" defaultValue={initialSettings['smtp_host']} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="smtp_port">SMTP Port</Label>
                            <Input id="smtp_port" name="smtp_port" type="number" defaultValue={initialSettings['smtp_port']} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="smtp_user">SMTP Username</Label>
                            <Input id="smtp_user" name="smtp_user" defaultValue={initialSettings['smtp_user']} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="smtp_password">SMTP Password</Label>
                            <Input id="smtp_password" name="smtp_password" type="password" defaultValue={initialSettings['smtp_password']} />
                        </div>
                    </div>
                </div>
            </div>
            
            <Button type="submit">Save Changes</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
