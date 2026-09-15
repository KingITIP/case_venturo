import type { ComponentNode } from '../types/editor';

// ----------------------------------------------------------------------
// Save mock — localStorage per id site, versioned, safe parse.
// Bentuk JSON identik dengan kontrak state #6 (components + pageMeta),
// sehingga mudah diganti API backend nanti.
// ----------------------------------------------------------------------

const STORAGE_PREFIX = 'venturo.builder.';
const STORAGE_VERSION = 1;

export type StoredSite = {
  version: number;
  components: ComponentNode[];
  pageMeta: { title?: string };
  updatedAt: string;
};

function storageKey(siteId: string): string {
  return `${STORAGE_PREFIX}${siteId}`;
}

/** Serialize & simpan ke localStorage. Throw jika gagal (penuh/korup). */
export function saveSiteToStorage(siteId: string, components: ComponentNode[]): void {
  const payload: StoredSite = {
    version: STORAGE_VERSION,
    components,
    pageMeta: {},
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(storageKey(siteId), JSON.stringify(payload));
}

/** Load dari localStorage; return null jika tidak ada / korup / versi beda. */
export function loadSiteFromStorage(siteId: string): ComponentNode[] | null {
  try {
    const raw = window.localStorage.getItem(storageKey(siteId));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredSite>;
    if (parsed.version !== STORAGE_VERSION) return null;
    if (!Array.isArray(parsed.components)) return null;

    // Validasi ringan tiap node — data korup tidak boleh crash.
    const valid = parsed.components.every(
      (c) =>
        c &&
        typeof c.id === 'string' &&
        typeof c.type === 'string' &&
        (c.props === undefined || (typeof c.props === 'object' && c.props !== null))
    );
    if (!valid) return null;

    return parsed.components as ComponentNode[];
  } catch {
    return null;
  }
}

export function removeSiteFromStorage(siteId: string): void {
  try {
    window.localStorage.removeItem(storageKey(siteId));
  } catch {
    // abaikan — storage mungkin tidak tersedia
  }
}
