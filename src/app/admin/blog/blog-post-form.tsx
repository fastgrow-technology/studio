
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogPostFormSchema } from '@/lib/validators';
import type { BlogPost } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { MediaPicker } from '../media/media-picker';
import { useState } from 'react';

type BlogPostFormData = Omit<BlogPost, 'id' | 'date'>;

interface BlogPostFormProps {
  formAction: (formData: FormData) => void;
  initialData?: BlogPost | null;
  title: string;
  buttonText: string;
}

export function BlogPostForm({ formAction, initialData, title, buttonText }: BlogPostFormProps) {
  const [imageUrl, setImageUrl] = useState(initialData?.image || '');

  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      published_at: format(new Date(initialData.published_at), "yyyy-MM-dd'T'HH:mm"),
    } : {
      slug: '',
      title: '',
      author: 'Admin',
      published_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      excerpt: '',
      content: '',
      image: '',
    },
  });

  const handleImageSelect = (url: string) => {
    setImageUrl(url);
    form.setValue('image', url);
  };

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Fill out the form to {buttonText.toLowerCase()}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={initialData?.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={initialData?.slug} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" defaultValue={initialData?.author || 'Admin'} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="published_at">Published Date</Label>
              <Input id="published_at" name="published_at" type="datetime-local" defaultValue={initialData ? format(new Date(initialData.published_at), "yyyy-MM-dd'T'HH:mm") : format(new Date(), "yyyy-MM-dd'T'HH:mm")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" name="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <MediaPicker onImageSelect={handleImageSelect} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" name="excerpt" defaultValue={initialData?.excerpt} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content (HTML)</Label>
            <Textarea id="content" name="content" defaultValue={initialData?.content || ''} rows={10} />
          </div>
          <Button type="submit">{buttonText}</Button>
        </CardContent>
      </Card>
    </form>
  );
}
