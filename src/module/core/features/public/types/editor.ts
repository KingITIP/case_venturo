import type { IconifyName } from 'src/shared/ui/iconify/register-icons';

// ----------------------------------------------------------------------
// KONTRAK DATA EDITOR (issue #6)
//
// State tree direpresentasikan sebagai array node komponen (urutan =
// urutan tampil di canvas). Bentuk ini dipakai ulang oleh #7 (interaksi),
// #8 (property panel / save) dan backend API nanti.
//
// Contoh:
//   components: [
//     { id: "c-1", type: "heading", props: { text: "Halo, Dunia", align: "left", level: 2 } },
//     { id: "c-2", type: "text",    props: { text: "Deskripsi singkat..." } },
//     { id: "c-3", type: "button",  props: { label: "Mulai", href: "#", variant: "filled" } },
//   ]
// ----------------------------------------------------------------------

export type EditorComponentType = 'text' | 'heading' | 'button' | 'image' | 'container' | 'divider';

export type EditorComponentDefinition = {
  type: EditorComponentType;
  labelKey: string;
  icon: IconifyName;
};

/** Props per tipe komponen (semua opsional — default aman di renderer) */
export type ComponentProps = {
  text?: string;
  align?: 'left' | 'center' | 'right';
  level?: 1 | 2 | 3;
  label?: string;
  href?: string;
  variant?: 'filled' | 'outline' | 'link';
  src?: string;
  alt?: string;
  ratio?: string;
  bgcolor?: 'transparent' | 'muted';
  thickness?: 'thin' | 'medium';
};

export type ComponentNode = {
  id: string;
  type: EditorComponentType;
  props?: ComponentProps;
};

export type EditorState = {
  components: ComponentNode[];
  selectedId: string | null;
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

/** Contoh statis untuk canvas — digantikan state tree sesungguhnya (#6) */
export const editorSampleComponents: ComponentNode[] = [
  { id: 'sample-1', type: 'heading', props: { text: 'Your page title', align: 'left', level: 2 } },
  {
    id: 'sample-2',
    type: 'text',
    props: { text: 'Start building your one-page site inside the editor.' },
  },
];
