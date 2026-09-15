import type { EditorState, ComponentNode } from '../types/editor';

import { useMemo, useState, useCallback, createContext } from 'react';

// ----------------------------------------------------------------------

export type EditorContextValue = EditorState & {
  loadTemplate: (components: ComponentNode[] | null) => void;
  select: (id: string | null) => void;
  setComponents: (next: ComponentNode[]) => void;
  reset: () => void;
};

// ----------------------------------------------------------------------

export const EditorContext = createContext<EditorContextValue | undefined>(undefined);

const INITIAL_STATE: EditorState = {
  components: [],
  selectedId: null,
};

/** Store editor: satu sumber kebenaran state halaman yang sedang diedit. */
export function useEditorReducer() {
  const [state, setState] = useState<EditorState>(INITIAL_STATE);

  const loadTemplate = useCallback((components: ComponentNode[] | null) => {
    setState({ components: components ?? [], selectedId: null });
  }, []);

  const select = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedId: id }));
  }, []);

  const setComponents = useCallback((next: ComponentNode[]) => {
    setState((prev) => ({ ...prev, components: next }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const value = useMemo<EditorContextValue>(
    () => ({ ...state, loadTemplate, select, setComponents, reset }),
    [state, loadTemplate, select, setComponents, reset]
  );

  return value;
}
