import type {
  EditorMode,
  EditorState,
  PageSettings,
  ComponentNode,
  ComponentProps,
  EditorComponentType,
} from '../types/editor';

import { useMemo, useState, useCallback, createContext } from 'react';

import { defaultPropsByType } from '../data/editor';
import { DEFAULT_PAGE_SETTINGS } from '../types/editor';

// ----------------------------------------------------------------------

export type EditorContextValue = EditorState & {
  loadTemplate: (components: ComponentNode[] | null, page?: Partial<PageSettings>) => void;
  select: (id: string | null) => void;
  setComponents: (next: ComponentNode[]) => void;
  reset: () => void;
  addComponent: (type: EditorComponentType, props?: ComponentNode['props']) => void;
  removeComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  moveComponent: (id: string, direction: 'up' | 'down') => void;
  moveComponentTo: (id: string, toIndex: number) => void;
  clearSelection: () => void;
  updateComponentProps: (id: string, partialProps: Partial<ComponentProps>) => void;
  updatePage: (partial: Partial<PageSettings>) => void;
  setMode: (mode: EditorMode) => void;
};

// ----------------------------------------------------------------------

export const EditorContext = createContext<EditorContextValue | undefined>(undefined);

const INITIAL_STATE: EditorState = {
  components: [],
  selectedId: null,
  mode: 'edit',
  page: DEFAULT_PAGE_SETTINGS,
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

  const loadTemplate = useCallback(
    (components: ComponentNode[] | null, page?: Partial<PageSettings>) => {
      setState((prev) => ({
        components: components ?? [],
        selectedId: null,
        mode: 'edit',
        page: { ...prev.page, ...page },
      }));
    },
    []
  );

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
    // Node baru memakai default props (termasuk color '#000000') supaya
    // render & panel properti konsisten (WYSIWYG).
    const node: ComponentNode = {
      id: createComponentId(),
      type,
      props: { ...defaultPropsByType[type], ...props },
    };
    setState((prev) => ({
      ...prev,
      components: [...prev.components, node],
      selectedId: node.id,
    }));
  }, []);

  const removeComponent = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
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
      return { ...prev, components: next, selectedId: copy.id };
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

  /** Pindahkan komponen ke index absolut — dipakai drag & drop reorder. */
  const moveComponentTo = useCallback((id: string, toIndex: number) => {
    setState((prev) => {
      const fromIndex = prev.components.findIndex((c) => c.id === id);
      if (fromIndex < 0) return prev;
      const clamped = Math.max(0, Math.min(toIndex, prev.components.length - 1));
      if (clamped === fromIndex) return prev;
      const next = [...prev.components];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(clamped, 0, moved);
      return { ...prev, components: next };
    });
  }, []);

  /** Update pengaturan halaman (latar, border, lebar konten, device). */
  const updatePage = useCallback((partial: Partial<PageSettings>) => {
    setState((prev) => ({ ...prev, page: { ...prev.page, ...partial } }));
  }, []);

  const updateComponentProps = useCallback((id: string, partialProps: Partial<ComponentProps>) => {
    setState((prev) => ({
      ...prev,
      components: prev.components.map((c) =>
        c.id === id ? { ...c, props: { ...(c.props ?? {}), ...partialProps } } : c
      ),
    }));
  }, []);

  const setMode = useCallback((mode: EditorMode) => {
    setState((prev) => ({ ...prev, mode }));
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
      moveComponentTo,
      clearSelection,
      updateComponentProps,
      updatePage,
      setMode,
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
      moveComponentTo,
      clearSelection,
      updateComponentProps,
      updatePage,
      setMode,
    ]
  );

  return value;
}
