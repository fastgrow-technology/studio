
import { getMediaFiles } from '@/lib/data/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MediaCard } from './media-card';
import { MediaUploadForm } from './media-upload-form';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function MediaGrid() {
  const files = await getMediaFiles();
  
  if (!files || files.length === 0) {
    return <p className="text-muted-foreground">No files uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {files.map((file) => (
         <MediaCard key={file.name} file={file} />
      ))}
    </div>
  );
}

function MediaGridSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            ))}
        </div>
    )
}

export default function MediaLibraryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
      </div>

       <Card>
         <CardHeader>
            <CardTitle>Upload New Media</CardTitle>
            <CardDescription>Upload images and files to use across your site.</CardDescription>
        </CardHeader>
        <CardContent>
            <MediaUploadForm />
        </CardContent>
       </Card>

       <Card>
        <CardHeader>
          <CardTitle>Your Uploaded Files</CardTitle>
          <CardDescription>Manage your media assets here. You can add alt text for SEO and accessibility.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<MediaGridSkeleton />}>
            <MediaGrid />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
