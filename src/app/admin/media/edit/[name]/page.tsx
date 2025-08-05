
import { getMediaFileByName, updateMediaAltText } from '@/lib/actions/media';
import { notFound, redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function EditMediaPage({ params }: { params: { name: string } }) {
  const fileName = decodeURIComponent(params.name);
  const file = await getMediaFileByName(fileName);

  if (!file) {
    notFound();
  }
  
  async function handleUpdateAltText(formData: FormData) {
    'use server';
    const altText = formData.get('alt_text') as string;
    await updateMediaAltText(fileName, altText);
    redirect('/admin/media');
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Card>
         <form action={handleUpdateAltText}>
            <CardHeader>
                <CardTitle>Edit Media</CardTitle>
                <CardDescription>Update the alt text for your image. Good alt text is important for SEO and accessibility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="w-full max-w-sm">
                    <Image src={file.url} alt={file.alt_text || 'Image preview'} width={400} height={400} className="rounded-md aspect-square object-cover" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="alt_text">Alt Text</Label>
                    <Input id="alt_text" name="alt_text" defaultValue={file.alt_text || ''} placeholder="e.g., A happy family outdoors"/>
                </div>
                <Button type="submit">Save Changes</Button>
            </CardContent>
         </form>
      </Card>
    </div>
  );
}
