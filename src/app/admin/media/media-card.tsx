
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteMediaFile } from '@/lib/actions/media';
import { Copy, Trash2, CheckCircle, Edit } from 'lucide-react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';
import { useTransition } from 'react';
import { formatRelative } from 'date-fns';
import Link from 'next/link';

interface MediaCardProps {
  file: Media;
  onSelect?: (url: string) => void;
  isSelected?: boolean;
}

export function MediaCard({ file, onSelect, isSelected }: MediaCardProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(file.url);
    toast({
      title: 'Copied to clipboard!',
      description: 'The file URL has been copied.',
    });
  };
  
  const handleDelete = async () => {
    const result = await deleteMediaFile(file.name);
    if (result.success) {
      toast({
        title: 'File Deleted',
        description: result.message,
      });
    } else {
       toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className={cn('flex flex-col', isSelected && 'ring-2 ring-primary')}>
      <CardContent className="p-2 flex-grow flex flex-col">
        <div className="aspect-square relative w-full overflow-hidden rounded-md group">
          <Image src={file.url} alt={file.alt_text || file.name} layout="fill" objectFit="cover" />
           {onSelect && (
            <div 
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => onSelect(file.url)}
            >
              {isSelected ? (
                <CheckCircle className="size-8 text-primary" />
              ) : (
                <span className="text-white font-semibold">Select</span>
              )}
            </div>
          )}
        </div>
        <div className="p-2 text-xs flex-grow">
            <p className="font-medium truncate" title={file.name}>{file.name}</p>
             <p className="text-muted-foreground truncate" title={file.alt_text || ''}>
                Alt: {file.alt_text || 'not set'}
            </p>
            <p className="text-muted-foreground" title={new Date(file.created_at).toLocaleString()}>
                {formatRelative(new Date(file.created_at), new Date())}
            </p>
        </div>
         <div className="flex justify-between items-center gap-2 p-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={copyToClipboard} type="button" title="Copy URL">
                <Copy className="h-4 w-4" />
            </Button>
             <Button asChild variant="outline" size="icon" className="h-8 w-8" title="Edit">
                <Link href={`/admin/media/edit/${encodeURIComponent(file.name)}`}>
                    <Edit className="h-4 w-4" />
                </Link>
            </Button>
            <DeleteConfirmationDialog
                onDelete={handleDelete}
                itemName={file.name}
            >
                <Button variant="destructive" size="icon" className="h-8 w-8" type="button" title="Delete">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DeleteConfirmationDialog>
        </div>
      </CardContent>
    </Card>
  );
}
