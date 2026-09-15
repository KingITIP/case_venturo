import type { ComponentNode } from '../types/editor';

import Stack from '@mui/material/Stack';

import { ComponentFrame } from './component-frame';
import { ComponentRenderer } from './component-renderer';

// ----------------------------------------------------------------------

type CanvasContentProps = {
  components: ComponentNode[];
  selectedId: string | null;
};

/** Susun komponen secara vertikal (urutan array) di dalam halaman canvas. */
export function CanvasContent({ components, selectedId }: CanvasContentProps) {
  if (components.length === 0) return null;

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      {components.map((node) => (
        <ComponentFrame key={node.id} selected={node.id === selectedId}>
          <ComponentRenderer node={node} />
        </ComponentFrame>
      ))}
    </Stack>
  );
}
