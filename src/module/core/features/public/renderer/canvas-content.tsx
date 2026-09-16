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
  /** Dipanggil saat drag & drop reorder (interactive only). */
  onReorder?: (id: string, toIndex: number) => void;
};

/** Susun komponen vertikal; tiap node (termasuk child container) bisa dipilih, di-reorder, dikontrol. */
export function CanvasContent({
  components,
  selectedId,
  interactive = true,
  onReorder,
}: CanvasContentProps) {
  const { select, moveComponent, duplicateComponent, removeComponent } = useEditor();

  if (components.length === 0) return null;

  if (!interactive) {
    return (
      <Stack spacing={3} sx={{ width: '100%' }}>
        {components.map((node) => (
          <ComponentRenderer key={node.id} node={node} preview />
        ))}
      </Stack>
    );
  }

  // --- Native HTML5 drag & drop reorder --------------------------------
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.currentTarget as HTMLElement;
    target.style.outline = '2px solid #00a76f';
    target.style.outlineOffset = '2px';
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.outline = '';
    target.style.outlineOffset = '';
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const target = e.currentTarget as HTMLElement;
    target.style.outline = '';
    target.style.outlineOffset = '';
    if (id && onReorder) onReorder(id, index);
  };

  /** Render satu node (dengan frame/selection). Children container dirender
   *  oleh ComponentRenderer sendiri (recursive) — kita hanya membungkus frame. */
  const renderNode = (node: ComponentNode, index: number, siblings: ComponentNode[]) => {
    const selected = node.id === selectedId;
    return (
      <ComponentFrame
        key={node.id}
        selected={selected}
        canMoveUp={index > 0}
        canMoveDown={index < siblings.length - 1}
        onSelect={() => select(node.id)}
        onMoveUp={() => moveComponent(node.id, 'up')}
        onMoveDown={() => moveComponent(node.id, 'down')}
        onDuplicate={() => duplicateComponent(node.id)}
        onRemove={() => removeComponent(node.id)}
        draggable
        onDragStart={(e) => handleDragStart(e, node.id)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
      >
        <ComponentRenderer node={node} onChildSelect={select} />
      </ComponentFrame>
    );
  };

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      {components.map((node, index) => renderNode(node, index, components))}
    </Stack>
  );
}
