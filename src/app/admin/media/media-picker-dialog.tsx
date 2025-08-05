
'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { MediaUploadForm } from './media-upload-form';
import { MediaCard } from './media-card';
import type { Media } from '@/lib/types';
import { getMediaFiles } from '@/lib/data/server-actions';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface MediaPickerDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onImageSelect: (url: string) => void;
}

function MediaGridSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            ))}
        </div>
    )
}

export function MediaPickerDialog({ isOpen, onOpenChange, onImageSelect }: MediaPickerDialogProps) {
  const [files, setFiles] = useState<Media[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    const fetchedFiles = await getMediaFiles();
    setFiles(fetchedFiles);
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen, fetchFiles]);

  const handleSelect = () => {
    if (selectedUrl) {
      onImageSelect(selectedUrl);
      onOpenChange(false);
      setSelectedUrl(null);
    }
  };
  
  const handleCancel = () => {
      onOpenChange(false);
      setSelectedUrl(null);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-5/6 flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
          <DialogDescription>Select an image or upload a new one.</DialogDescription>
        </DialogHeader>
        <div className="border-t pt-4">
            <MediaUploadForm onUploadSuccess={fetchFiles} />
        </div>
        <div className="flex-grow overflow-y-auto border-t mt-4 pt-4">
          {isLoading ? <MediaGridSkeleton /> : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {files.map((file) => (
                file.name !== '.emptyFolderPlaceholder' && (
                    <MediaCard
                    key={file.name}
                    file={file}
                    onSelect={setSelectedUrl}
                    isSelected={selectedUrl === file.url}
                    />
                )
                ))}
            </div>
          )}
        </div>
        <DialogFooter className="border-t pt-4">
            <Button onClick={handleCancel} variant="outline">Cancel</Button>
            <Button onClick={handleSelect} disabled={!selectedUrl}>
                Select Image
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
