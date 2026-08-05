'use client';

import dynamic from 'next/dynamic';
import type { InfiniteGalleryProps } from './3d-gallery-photography';

const Gallery = dynamic(
    () => import('./3d-gallery-photography').then((m) => m.default),
    {
        ssr: false,
        loading: () => (
            <div className="absolute inset-0 bg-ink-900 animate-pulse" />
        ),
    }
);

export default function GalleryClient(props: InfiniteGalleryProps) {
    return <Gallery {...props} />;
}