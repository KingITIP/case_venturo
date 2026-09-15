import type { EditorState, ComponentNode, EditorComponentType } from '../types/editor';

import { useMemo, useState, useCallback, createContext } from 'react';

// ----------------------------------------------------------------------

export type EditorContextValue = EditorState & {
  loadTemplate: (components: ComponentNode[] | null) => void;
  select: (id: string | null) => void;
  setComponents: (next: ComponentNode[]) => void;
  reset: () => void;
  addComponent: (type: EditorComponentType, props?: ComponentNode['props']) => void;
  removeComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  moveComponent: (id: string, direction: 'up' | 'down') => void;
  clearSelection: () => void;
};

// ----------------------------------------------------------------------

export const EditorContext = createContext<EditorContextValue | undefined>(undefined);

const INITIAL_STATE: EditorState = {
  components: [],
  selectedId: null,
};

/** Id unik komponen — tidak pernah bentrok (timestamp + counter + random). */
let nodeCounter = 0;
function createComponentId(): string {
  nodeCounter += 1;
  return `c-${Date.now().toString(36)}-${nodeCounter}-${Math.random().toString(36).slice(2, 6)}`;
}

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

  const clearSelection = useCallback(() => {
    setState((prev) => ({ ...prev, selectedId: null }));
  }, []);

  const addComponent = useCallback((type: EditorComponentType, props?: ComponentNode['props']) => {
    const node: ComponentNode = { id: createComponentId(), type, props: props ?? {} };
    setState((prev) => ({
      components: [...prev.components, node],
      selectedId: node.id,
    }));
  }, []);

  const removeComponent = useCallback((id: string) => {
    setState((prev) => ({
      components: prev.components.filter((c) => c.id !== id),
      selectedId: prev.selectedId === id ? null : prev.selectedId,
    }));
  }, []);

  const duplicateComponent = useCallback((id: string) => {
    setState((prev) => {
      const index = prev.components.findIndex((c) => c.id === id);
      if (index < 0) return prev;
      const source = prev.components[index];
      const copy: ComponentNode = {
        id: createComponentId(),
        type: source.type,
        props: source.props ? { ...source.props } : {},
      };
      const next = [...prev.components];
      next.splice(index + 1, 0, copy);
      return { components: next, selectedId: copy.id };
    });
  }, []);

  const moveComponent = useCallback((id: string, direction: 'up' | 'down') => {
    setState((prev) => {
      const index = prev.components.findIndex((c) => c.id === id);
      if (index < 0) return prev;
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= prev.components.length) return prev;
      const next = [...prev.components];
      [next[index], next[target]] = [next[target], next[index]];
      return { ...prev, components: next };
    });
  }, []);

  const value = useMemo<EditorContextValue>(
    () => ({
      ...state,
      loadTemplate,
      select,
      setComponents,
      reset,
      addComponent,
      removeComponent,
      duplicateComponent,
      moveComponent,
      clearSelection,
    }),
    [
      state,
      loadTemplate,
      select,
      setComponents,
      reset,
      addComponent,
      removeComponent,
      duplicateComponent,
      moveComponent,
      clearSelection,
    ]
  );

  return value;
}
