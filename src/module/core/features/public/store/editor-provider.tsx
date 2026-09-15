import type { ReactNode } from 'react';
import type { PageSettings, ComponentNode } from '../types/editor';

import { useEffect, useContext } from 'react';

import { useTranslate } from 'src/locales';
import { toast } from 'src/shared/ui/snackbar';

import { DEFAULT_PAGE_SETTINGS } from '../types/editor';
import { getDummyTemplateComponents } from '../data/editor';
import { loadSiteFromStorage } from '../lib/editor-storage';
import { EditorContext, useEditorReducer } from './editor-context';

// ----------------------------------------------------------------------

export const BLANK_ID = 'blank';

type InitialLoad = {
  components: ComponentNode[];
  page: PageSettings;
  source: 'blank' | 'dummy' | 'unknown';
};

/** Muat state awal berdasarkan id: localStorage dulu, lalu blank/dummy/unknown. */
function resolveInitialComponents(id: string | undefined): InitialLoad {
  if (!id) return { components: [], page: DEFAULT_PAGE_SETTINGS, source: 'blank' };

  // 1. Data tersimpan di localStorage → lanjut pekerjaan sebelumnya
  const stored = loadSiteFromStorage(id);
  if (stored) return { components: stored.components, page: stored.page, source: 'dummy' };

  // 2. id blank → kosong
  if (id === BLANK_ID) return { components: [], page: DEFAULT_PAGE_SETTINGS, source: 'blank' };

  // 3. id template dummy → definisi template (#6)
  const found = getDummyTemplateComponents(id);
  if (found) return { components: found, page: DEFAULT_PAGE_SETTINGS, source: 'dummy' };

  // 4. id tak dikenal → kosong + snackbar info
  return { components: [], page: DEFAULT_PAGE_SETTINGS, source: 'unknown' };
}

// ----------------------------------------------------------------------

type EditorProviderProps = {
  siteId?: string;
  children: ReactNode;
};

export function EditorProvider({ siteId, children }: EditorProviderProps) {
  const { t } = useTranslate('editor');
  const store = useEditorReducer();
  const { loadTemplate } = store;

  // Muat sekali saat halaman terbuka; reset antar kunjungan otomatis
  // karena provider di-mount ulang per route.
  useEffect(() => {
    const { components, page, source } = resolveInitialComponents(siteId);
    loadTemplate(components, page);

    if (source === 'unknown') {
      toast.info(t('message.unknownId'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId]);

  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>;
}

// ----------------------------------------------------------------------

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return ctx;
}

export function useEditorState() {
  const { components, selectedId, mode, page } = useEditor();
  return { components, selectedId, mode, page };
}