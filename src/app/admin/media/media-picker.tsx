
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MediaPickerDialog } from './media-picker-dialog';
import { getMediaFiles } from '@/lib/data/server';

interface MediaPickerProps {
    onImageSelect: (url: string) => void;
}

export function MediaPicker({ onImageSelect }: MediaPickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button type="button" variant="outline" onClick={() => setIsOpen(true)}>
                Select from Library
            </Button>
            <MediaPickerDialog 
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                onImageSelect={onImageSelect}
            />
        </div>
    );
}
