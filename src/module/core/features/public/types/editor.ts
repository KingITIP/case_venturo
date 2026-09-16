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
  /** Warna aksen (teks utama / label) — bebas hex */
  color?: string;
  /** Warna border — bebas hex */
  borderColor?: string;
  /** Ketebalan border (px) */
  borderWidth?: number;
  /** Bentuk gambar/container: rectangle (default) atau circle */
  shape?: 'rectangle' | 'circle';
  /** Pembulatan sudut (px) — hanya untuk shape rectangle */
  cornerRadius?: number;
  /** Jarak antara border dan konten/gambar (px) */
  padding?: number;
  /** Transparansi keseluruhan elemen (0–100, 100 = solid) */
  opacity?: number;
  /** Transparansi latar elemen (0–100) — button/container */
  bgOpacity?: number;
  /** Warna latar container (hex) — bila diisi, dipakai sebagai background
   *  container (dengan bgOpacity sebagai fade). Menggantikan bgcolor lama
   *  ('transparent' | 'muted'). */
  bgColor?: string;
  /** Jarak antar child (px) — khusus container */
  gap?: number;
  /** Ikon pada button (nama Iconify, mis. 'mdi:whatsapp'). ''/undefined = tanpa ikon */
  icon?: string;
  /** Posisi ikon button — kiri (default) atau kanan */
  iconPosition?: 'left' | 'right';
  /** Ukuran ikon button (px), default 18 */
  iconSize?: number;
  /** Lebar elemen (px) — default auto/100% mengikuti konten */
  width?: number;
  /** Tinggi elemen (px) — default auto */
  height?: number;
};

export type ComponentNode = {
  id: string;
  type: EditorComponentType;
  props?: ComponentProps;
  /** Anak-anak komponen (khusus container — nested group) */
  children?: ComponentNode[];
};

export type EditorMode = 'edit' | 'preview';

export type EditorPageMeta = {
  title?: string;
};

/** Ukuran perangkat preview/kanvas (ala Carrd) */
export type DeviceSize = 'mobile' | 'tablet' | 'desktop' | 'auto';

/** Pengaturan halaman — latar, border, lebar konten, padding */
export type PageSettings = {
  /** Warna latar halaman (hex) */
  backgroundColor: string;
  /** Warna border halaman (hex) */
  borderColor: string;
  /** Ketebalan border halaman (px) */
  borderWidth: number;
  /** Lebar konten maksimum (px) */
  maxWidth: number;
  /** Padding konten (px) */
  padding: number;
  /** Ukuran perangkat aktif (preview & kanvas) */
  device: DeviceSize;
  /** Gambar latar halaman (data URL dari upload lokal) */
  bgImage?: string;
  /** Fade/overlay warna di atas latar (hex) */
  fadeColor?: string;
  /** Opasitas fade (0-100) */
  fadeOpacity?: number;
  /** Gradient aktif */
  gradientEnabled?: boolean;
  /** Warna awal gradient (hex) */
  gradientFrom?: string;
  /** Warna akhir gradient (hex) */
  gradientTo?: string;
  /** Sudut gradient (derajat) */
  gradientAngle?: number;
  /** Background fullscreen menempel (fixed) — tidak ikut scroll */
  bgFixed?: boolean;
  /** Warna kertas PAGE (hex) — terpisah dari background fullscreen */
  paperColor?: string;
  /** Transparansi kertas page 0–100 (100 = solid, 0 = transparan penuh) */
  paperOpacity?: number;
  /** Efek bayangan (shadow) pada kertas page — true = ada shadow */
  paperShadow?: boolean;
};

export const DEFAULT_PAGE_SETTINGS: PageSettings = {
  backgroundColor: '#ffffff',
  borderColor: '#e0e0e0',
  borderWidth: 0,
  maxWidth: 720,
  padding: 32,
  device: 'desktop',
  fadeColor: '#000000',
  fadeOpacity: 0,
  gradientEnabled: false,
  gradientFrom: '#ffffff',
  gradientTo: '#e0e0e0',
  gradientAngle: 135,
  bgFixed: true,
  paperColor: '#ffffff',
  paperOpacity: 100,
  paperShadow: true,
};

export type EditorState = {
  components: ComponentNode[];
  selectedId: string | null;
  mode: EditorMode;
  page: PageSettings;
};

// ----------------------------------------------------------------------

export const editorPaletteItems: EditorComponentDefinition[] = [
  { type: 'text', labelKey: 'palette.items.text', icon: 'solar:letter-bold' },
  { type: 'heading', labelKey: 'palette.items.heading', icon: 'solar:pen-bold' },
  {
    type: 'button',
    labelKey: 'palette.items.button',
    icon: 'solar:tag-horizontal-bold-duotone',
  },
  { type: 'image', labelKey: 'palette.items.image', icon: 'solar:gallery-wide-bold' },
  {
    type: 'container',
    labelKey: 'palette.items.container',
    icon: 'solar:box-minimalistic-bold',
  },
  { type: 'divider', labelKey: 'palette.items.divider', icon: 'eva:minus-circle-fill' },
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
