import type { IconifyName } from 'src/shared/ui/iconify/register-icons';

// ----------------------------------------------------------------------

export type EditorComponentType = 'text' | 'heading' | 'button' | 'image' | 'container' | 'divider';

export type EditorComponentDefinition = {
  type: EditorComponentType;
  labelKey: string;
  icon: IconifyName;
};

export type EditorComponentProps = {
  /** Nilai teks / konten utama (dipakai penuh di issue #6) */
  content?: string;
  [key: string]: unknown;
};

export type EditorComponent = {
  id: string;
  type: EditorComponentType;
  props: EditorComponentProps;
};

// ----------------------------------------------------------------------

export const editorPaletteItems: EditorComponentDefinition[] = [
  { type: 'text', labelKey: 'editor.palette.items.text', icon: 'solar:letter-bold' },
  { type: 'heading', labelKey: 'editor.palette.items.heading', icon: 'solar:pen-bold' },
  {
    type: 'button',
    labelKey: 'editor.palette.items.button',
    icon: 'solar:tag-horizontal-bold-duotone',
  },
  { type: 'image', labelKey: 'editor.palette.items.image', icon: 'solar:gallery-wide-bold' },
  {
    type: 'container',
    labelKey: 'editor.palette.items.container',
    icon: 'solar:box-minimalistic-bold',
  },
  { type: 'divider', labelKey: 'editor.palette.items.divider', icon: 'eva:minus-circle-fill' },
];

// ----------------------------------------------------------------------

/** Contoh statis untuk canvas — akan digantikan state tree di issue #6 */
export const editorSampleComponents: EditorComponent[] = [
  { id: 'sample-1', type: 'heading', props: { content: 'Your page title' } },
  {
    id: 'sample-2',
    type: 'text',
    props: { content: 'Start building your one-page site inside the editor.' },
  },
];
