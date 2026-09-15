import type { ComponentNode } from '../types/editor';

import Stack from '@mui/material/Stack';

import { ComponentFrame } from './component-frame';
import { useEditor } from '../store/editor-provider';
import { ComponentRenderer } from './component-renderer';

// ----------------------------------------------------------------------

type CanvasContentProps = {
  components: ComponentNode[];
  selectedId: string | null;
  /** false = render bersih (preview), tanpa frame/toolbar/interaksi. */
  interactive?: boolean;
};

/** Susun komponen vertikal; tiap node bisa dipilih & dikontrol (reorder/duplikat/hapus). */
export function CanvasContent({ components, selectedId, interactive = true }: CanvasContentProps) {
  const { select, moveComponent, duplicateComponent, removeComponent } = useEditor();

  if (components.length === 0) return null;

  if (!interactive) {
    return (
      <Stack spacing={3} sx={{ width: '100%' }}>
        {components.map((node) => (
          <ComponentRenderer key={node.id} node={node} />
        ))}
      </Stack>
    );
  }

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      {components.map((node, index) => {
        const selected = node.id === selectedId;
        return (
          <ComponentFrame
            key={node.id}
            selected={selected}
            canMoveUp={index > 0}
            canMoveDown={index < components.length - 1}
            onSelect={() => select(node.id)}
            onMoveUp={() => moveComponent(node.id, 'up')}
            onMoveDown={() => moveComponent(node.id, 'down')}
            onDuplicate={() => duplicateComponent(node.id)}
            onRemove={() => removeComponent(node.id)}
          >
            <ComponentRenderer node={node} />
          </ComponentFrame>
        );
      })}
    </Stack>
  );
}
