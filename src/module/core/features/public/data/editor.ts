import type { ComponentNode, ComponentProps, EditorComponentType } from '../types/editor';

// ----------------------------------------------------------------------
// Default props per tipe — dipakai renderer saat node tidak menyediakan
// props (default aman, tidak pernah crash).
// ----------------------------------------------------------------------

export const defaultPropsByType: Record<EditorComponentType, ComponentProps> = {
  heading: { text: 'Tulis judul di sini', align: 'left', level: 2, color: '#000000', opacity: 100 },
  text: { text: 'Tulis teks di sini', align: 'left', color: '#000000', opacity: 100 },
  button: {
    label: 'Tombol',
    href: '#',
    variant: 'filled',
    color: '#00a76f',
    bgOpacity: 100,
    opacity: 100,
    icon: '',
    iconPosition: 'left',
    iconSize: 18,
  },
  image: { src: undefined, alt: 'Gambar', ratio: '16:9', opacity: 100 },
  container: { bgcolor: 'transparent', bgOpacity: 100, opacity: 100, gap: 12, padding: 16 },
  divider: { thickness: 'medium', opacity: 100 },
};

// ----------------------------------------------------------------------
// Template dummy — selaras dengan data/build.ts (Template.definition).
// Setiap blok dirender sebagai ComponentNode dengan props default + contoh.
// ----------------------------------------------------------------------

export const dummyTemplateDefinitions: Record<string, ComponentNode[]> = {
  'dummy-profile': [
    { id: 'c-1', type: 'heading', props: { text: 'Halo, saya Andi', align: 'center', level: 1 } },
    {
      id: 'c-2',
      type: 'text',
      props: {
        text: 'Saya membantu bisnis tampil online dengan one-page site yang cepat dan indah.',
        align: 'center',
      },
    },
    { id: 'c-3', type: 'image', props: { src: undefined, alt: 'Foto profil', ratio: '1:1' } },
    {
      id: 'c-4',
      type: 'button',
      props: {
        label: 'Hubungi Saya',
        href: 'https://api.whatsapp.com/send/?phone=628128043814&text=Halo%20Andi',
        variant: 'filled',
        icon: 'mdi:whatsapp',
        iconPosition: 'right',
        iconSize: 18,
      },
    },
  ],
  'dummy-landing-1': [
    {
      id: 'c-1',
      type: 'heading',
      props: { text: 'Bangun Situs Impianmu', align: 'center', level: 1 },
    },
    {
      id: 'c-2',
      type: 'text',
      props: {
        text: 'Venturo adalah web builder satu halaman yang super mudah — tanpa perlu coding.',
        align: 'center',
      },
    },
    { id: 'c-3', type: 'button', props: { label: 'Mulai Sekarang', href: '#', variant: 'filled' } },
    { id: 'c-4', type: 'divider', props: { thickness: 'medium' } },
  ],
  'dummy-landing-2': [
    {
      id: 'c-1',
      type: 'heading',
      props: { text: 'Produk Digital, Tampil Elegan', align: 'center', level: 1 },
    },
    {
      id: 'c-2',
      type: 'text',
      props: {
        text: 'Tunjukkan karya terbaikmu dengan halaman yang bersih dan modern.',
        align: 'center',
      },
    },
    { id: 'c-3', type: 'image', props: { src: undefined, alt: 'Produk', ratio: '16:9' } },
  ],
  'dummy-form': [
    { id: 'c-1', type: 'heading', props: { text: 'Daftar Newsletter', align: 'center', level: 2 } },
    {
      id: 'c-2',
      type: 'text',
      props: {
        text: 'Dapatkan update terbaru langsung ke emailmu. Form aktif di issue berikutnya.',
        align: 'center',
      },
    },
    { id: 'c-3', type: 'button', props: { label: 'Kirim', href: '#', variant: 'filled' } },
  ],
  'dummy-portfolio': [
    { id: 'c-1', type: 'heading', props: { text: 'Karya Saya', align: 'left', level: 1 } },
    { id: 'c-2', type: 'image', props: { src: undefined, alt: 'Proyek 1', ratio: '4:3' } },
    { id: 'c-3', type: 'image', props: { src: undefined, alt: 'Proyek 2', ratio: '4:3' } },
    { id: 'c-4', type: 'button', props: { label: 'Lihat Semua', href: '#', variant: 'outline' } },
  ],
  'dummy-showcase': [
    { id: 'c-1', type: 'container', props: { bgcolor: 'muted' } },
    { id: 'c-2', type: 'heading', props: { text: 'Fitur Unggulan', align: 'center', level: 2 } },
    {
      id: 'c-3',
      type: 'text',
      props: { text: 'Tiga alasan memilih Venturo: cepat, mudah, dan indah.', align: 'center' },
    },
    { id: 'c-4', type: 'button', props: { label: 'Coba Gratis', href: '#', variant: 'filled' } },
    { id: 'c-5', type: 'divider', props: { thickness: 'thin' } },
  ],
  'dummy-sectioned': [
    { id: 'c-1', type: 'heading', props: { text: 'Beranda', align: 'left', level: 1 } },
    {
      id: 'c-2',
      type: 'text',
      props: { text: 'Selamat datang di situs satu halaman saya.', align: 'left' },
    },
    { id: 'c-3', type: 'divider', props: { thickness: 'medium' } },
    { id: 'c-4', type: 'heading', props: { text: 'Tentang', align: 'left', level: 2 } },
    {
      id: 'c-5',
      type: 'text',
      props: { text: 'Sedikit cerita tentang saya dan apa yang saya kerjakan.', align: 'left' },
    },
  ],
};

// ----------------------------------------------------------------------

/** Cari definisi template dummy berdasarkan id (selaras data/build). */
export function getDummyTemplateComponents(id: string): ComponentNode[] | null {
  const def = dummyTemplateDefinitions[id];
  return def ? structuredClone(def) : null;
}
