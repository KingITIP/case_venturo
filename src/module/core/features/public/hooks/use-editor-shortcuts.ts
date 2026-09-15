import { useEffect } from 'react';

// ----------------------------------------------------------------------

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || target.isContentEditable;
}

type UseEditorShortcutsParams = {
  selectedId: string | null;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onClear: () => void;
};

/**
 * Shortcut keyboard editor — hanya aktif saat fokus TIDAK di input/textarea
 * (Delete hapus, Esc batal pilih, Ctrl/Cmd+D duplikat).
 */
export function useEditorShortcuts({
  selectedId,
  onRemove,
  onDuplicate,
  onClear,
}: UseEditorShortcutsParams) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      if (!selectedId) return;

      const key = event.key;

      if (key === 'Delete' || key === 'Backspace') {
        event.preventDefault();
        onRemove(selectedId);
      } else if (key === 'Escape') {
        onClear();
      } else if ((event.ctrlKey || event.metaKey) && key.toLowerCase() === 'd') {
        event.preventDefault();
        onDuplicate(selectedId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, onRemove, onDuplicate, onClear]);
}
