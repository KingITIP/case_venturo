import type { PageSettings } from '../types/editor';

// ----------------------------------------------------------------------
// Helper gaya latar halaman — dipakai editor canvas, preview, dan (nanti)
// build output agar WYSIWYG konsisten.
// ----------------------------------------------------------------------

/**
 * Konversi #rrggbb (atau #rgb) ke rgba() dengan alpha
 */
export function fromHexWithAlpha(hex: string, alpha: number): string {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return `rgba(0, 0, 0, ${alpha})`;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Build CSS background layers untuk halaman dari PageSettings.
 *
 * Mengembalikan objek dengan:
 * - backgroundImage: gradient + bgImage (jika ada)
 * - backgroundColor: warna latar dasar + fade overlay (rgba)
 *
 * Dengan memisahkan backgroundImage dan backgroundColor, komponen MUI
 * tidak akan mengalami konflik specificity antara shorthand `background`
 * dan Paper's default `background-color`.
 */
export function pageBackgroundStyle(page: PageSettings): {
  backgroundImage?: string;
  backgroundColor?: string;
} {
  // --- Background color: base color + fade overlay ---
  const base = page.backgroundColor || '#ffffff';
  let bgColor: string;
  if (page.fadeColor && (page.fadeOpacity ?? 0) > 0) {
    const opacity = Math.min(100, Math.max(0, page.fadeOpacity ?? 0)) / 100;
    bgColor = fromHexWithAlpha(page.fadeColor, opacity);
  } else {
    bgColor = base;
  }

  // --- Background image: gradient + bgImage ---
  const imageLayers: string[] = [];
  if (page.gradientEnabled) {
    const angle = page.gradientAngle ?? 135;
    imageLayers.push(
      `linear-gradient(${angle}deg, ${page.gradientFrom || '#ffffff'}, ${page.gradientTo || '#e0e0e0'})`
    );
  }
  if (page.bgImage) {
    imageLayers.push(`url("${page.bgImage}") center/cover no-repeat`);
  }

  return {
    backgroundImage: imageLayers.length > 0 ? imageLayers.join(', ') : undefined,
    backgroundColor: bgColor,
  };
}

/**
 * Gaya untuk LAPISAN BACKGROUND FULLSCREEN (di belakang page).
 *
 * Meniru anatomi Carrd (venturoexpert.carrd.co): sebuah elemen fixed
 * 100vw x 100vh, z-index rendah, pointer-events none, memuat gambar
 * cover + gradient + warna + overlay gelap. Konten (page) berada di
 * atasnya dan bisa scroll sendiri tanpa menggerakkan lapisan ini.
 *
 * `fixed` = true  → position fixed (tidak ikut scroll, ala Carrd).
 * `fixed` = false → position absolute (mengikuti konten, normal).
 */
export function pageFullBackgroundStyle(page: PageSettings, fixed?: boolean): React.CSSProperties {
  const bg = pageBackgroundStyle(page);
  return {
    position: fixed ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    pointerEvents: 'none',
    backgroundImage: bg.backgroundImage,
    backgroundColor: bg.backgroundColor,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
}
