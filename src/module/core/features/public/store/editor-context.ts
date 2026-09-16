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
  addChildComponent: (
    containerId: string,
    type: EditorComponentType,
    props?: ComponentNode['props']
  ) => void;
  removeChildComponent: (id: string) => void;
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

// ----------------------------------------------------------------------
// Utils tree (nested children — container). Semua operasi node bekerja
// RECURSIVE di kedalaman mana pun (batas kedalaman dibatasi di UI).
// ----------------------------------------------------------------------

/** Cari node (termasuk di dalam children) berdasarkan id. */
export function findNode(nodes: ComponentNode[], id: string): ComponentNode | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children?.length) {
      const found = findNode(n.children, id);
      if (found) return found;
    }
  }
  return null;
}

/** Mutasi node berdasarkan id (di level mana pun) — imutabel. */
function mapNodes(
  nodes: ComponentNode[],
  id: string,
  fn: (node: ComponentNode) => ComponentNode
): ComponentNode[] {
  return nodes.map((n) => {
    if (n.id === id) return fn(n);
    if (n.children?.length) {
      return { ...n, children: mapNodes(n.children, id, fn) };
    }
    return n;
  });
}

/** Hapus node berdasarkan id (di level mana pun). */
function removeNode(nodes: ComponentNode[], id: string): ComponentNode[] {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) =>
      n.children?.length ? { ...n, children: removeNode(n.children, id) } : n
    );
}

/** Cari parent (node yang memiliki child dengan id). */
export function findParent(
  nodes: ComponentNode[],
  id: string
): { parent: ComponentNode; index: number } | null {
  for (let i = 0; i < nodes.length; i += 1) {
    const n = nodes[i];
    if (n.children?.some((c) => c.id === id)) return { parent: n, index: i };
    if (n.children?.length) {
      const found = findParent(n.children, id);
      if (found) return found;
    }
  }
  return null;
}

// ----------------------------------------------------------------------

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
      components: removeNode(prev.components, id),
      selectedId: prev.selectedId === id ? null : prev.selectedId,
    }));
  }, []);

  const duplicateComponent = useCallback((id: string) => {
    setState((prev) => {
      // Cari node di level mana pun + parent-nya
      const found = findNode(prev.components, id);
      if (!found) return prev;
      const copy: ComponentNode = {
        id: createComponentId(),
        type: found.type,
        props: found.props ? { ...found.props } : {},
        children: found.children?.map((c) => structuredClone(c)) ?? [],
      };
      const parentInfo = findParent(prev.components, id);
      if (parentInfo) {
        // child di dalam container — sisip ke children parent
        const { parent, index } = parentInfo;
        const newChildren = [...(parent.children ?? [])];
        newChildren.splice(index + 1, 0, copy);
        return {
          ...prev,
          components: mapNodes(prev.components, parent.id, (p) => ({
            ...p,
            children: newChildren,
          })),
          selectedId: copy.id,
        };
      }
      const index = prev.components.findIndex((c) => c.id === id);
      if (index < 0) return prev;
      const next = [...prev.components];
      next.splice(index + 1, 0, copy);
      return { ...prev, components: next, selectedId: copy.id };
    });
  }, []);

  const moveComponent = useCallback((id: string, direction: 'up' | 'down') => {
    setState((prev) => {
      // coba di level atas dulu
      const index = prev.components.findIndex((c) => c.id === id);
      if (index >= 0) {
        const target = direction === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= prev.components.length) return prev;
        const next = [...prev.components];
        [next[index], next[target]] = [next[target], next[index]];
        return { ...prev, components: next };
      }
      // child di dalam container
      const parentInfo = findParent(prev.components, id);
      if (!parentInfo) return prev;
      const { parent } = parentInfo;
      const siblings = parent.children ?? [];
      const childIndex = siblings.findIndex((c) => c.id === id);
      const target = direction === 'up' ? childIndex - 1 : childIndex + 1;
      if (target < 0 || target >= siblings.length) return prev;
      const newChildren = [...siblings];
      [newChildren[childIndex], newChildren[target]] = [newChildren[target], newChildren[childIndex]];
      return {
        ...prev,
        components: mapNodes(prev.components, parent.id, (p) => ({
          ...p,
          children: newChildren,
        })),
      };
    });
  }, []);

  /** Pindahkan komponen ke index absolut — dipakai drag & drop reorder. */
  const moveComponentTo = useCallback((id: string, toIndex: number) => {
    setState((prev) => {
      const fromIndex = prev.components.findIndex((c) => c.id === id);
      if (fromIndex < 0) {
        // child di dalam container — move up/down via tombol saja di UI
        return prev;
      }
      const clamped = Math.max(0, Math.min(toIndex, prev.components.length - 1));
      if (clamped === fromIndex) return prev;
      const next = [...prev.components];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(clamped, 0, moved);
      return { ...prev, components: next };
    });
  }, []);

  /** Tambah komponen sebagai CHILD dari container (nested). */
  const addChildComponent = useCallback(
    (containerId: string, type: EditorComponentType, props?: ComponentNode['props']) => {
      const node: ComponentNode = {
        id: createComponentId(),
        type,
        props: { ...defaultPropsByType[type], ...props },
      };
      setState((prev) => {
        const container = findNode(prev.components, containerId);
        if (!container) return prev;
        return {
          ...prev,
          components: mapNodes(prev.components, containerId, (c) => ({
            ...c,
            children: [...(c.children ?? []), node],
          })),
          selectedId: node.id,
        };
      });
    },
    []
  );

  /** Hapus komponen di level mana pun (termasuk child di dalam container). */
  const removeChildComponent = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      components: removeNode(prev.components, id),
      selectedId: prev.selectedId === id ? null : prev.selectedId,
    }));
  }, []);

  /** Update pengaturan halaman (latar, border, lebar konten, device). */
  const updatePage = useCallback((partial: Partial<PageSettings>) => {
    setState((prev) => ({ ...prev, page: { ...prev.page, ...partial } }));
  }, []);

  const updateComponentProps = useCallback((id: string, partialProps: Partial<ComponentProps>) => {
    setState((prev) => ({
      ...prev,
      components: mapNodes(prev.components, id, (c) => ({
        ...c,
        props: { ...(c.props ?? {}), ...partialProps },
      })),
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
      addChildComponent,
      removeChildComponent,
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
      addChildComponent,
      removeChildComponent,
      clearSelection,
      updateComponentProps,
      updatePage,
      setMode,
    ]
  );

  return value;
}