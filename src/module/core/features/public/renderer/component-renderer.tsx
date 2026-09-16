import type { ComponentNode, ComponentProps } from '../types/editor';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { defaultPropsByType } from '../data/editor';

// ----------------------------------------------------------------------

const alignMap = { left: 'left', center: 'center', right: 'right' } as const;
const levelMap = { 1: 'h1', 2: 'h2', 3: 'h3' } as const;

/** Border bersama: warna + ketebalan (opsional, default tipis keabuan) */
function borderStyle(def: { borderColor?: string; borderWidth?: number }) {
  const color = def.borderColor || 'divider';
  const width = def.borderWidth ?? 1;
  return { border: `${width}px solid ${color === 'divider' ? 'divider' : color}` };
}

/** Padding frame (jarak border → konten). Default 0; dipakai elemen ber-border. */
function framePadding(def: { padding?: number }): number | string {
  return def.padding && def.padding > 0 ? def.padding : 0;
}

/** Border radius sesuai shape (circle = 50%, rectangle = cornerRadius px). */
function frameRadius(shape: ComponentProps['shape'], cornerRadius?: number): number | string {
  if (shape === 'circle') return '50%';
  return cornerRadius && cornerRadius > 0 ? cornerRadius : 0;
}

/** Opasitas keseluruhan elemen (0–100) → CSS opacity. */
function elementOpacity(def: ComponentProps): number | undefined {
  return def.opacity !== undefined && def.opacity < 100 ? def.opacity / 100 : undefined;
}

function imagePlaceholderSrc() {
  // Data URI SVG abu-abu dengan ikon — offline-friendly
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="#e0e0e0"/><text x="50%" y="50%" font-family="sans-serif" font-size="28" fill="#9e9e9e" text-anchor="middle">Gambar</text></svg>`
  )}`;
}

/** Render satu node komponen menjadi tampilan halaman (WYSIWYG). */
export function ComponentRenderer({
  node,
  preview = false,
}: {
  node: ComponentNode;
  /** true = mode preview/built (interactive: link tombol bisa diklik, bukan editing). */
  preview?: boolean;
}) {
  const { t } = useTranslate('editor');
  const { type, props = {} } = node;
  const def: ComponentProps & { [key: string]: any } = { ...defaultPropsByType[type], ...props };

  switch (type) {
    case 'heading':
      return (
        <Typography
          component={levelMap[def.level ?? 2]}
          variant={levelMap[def.level ?? 2]}
          sx={{
            textAlign: alignMap[def.align ?? 'left'],
            fontWeight: 700,
            color: def.color || '#000000',
            ...(def.borderColor || def.borderWidth ? { ...borderStyle(def) } : {}),
            ...(def.borderColor || def.borderWidth ? { p: framePadding(def) } : {}),
            ...(elementOpacity(def) !== undefined ? { opacity: elementOpacity(def) } : {}),
          }}
        >
          {def.text || t('renderer.placeholder.heading')}
        </Typography>
      );

    case 'text':
      return (
        <Typography
          variant="body1"
          sx={{
            textAlign: alignMap[def.align ?? 'left'],
            color: def.color || '#000000',
            maxWidth: 640,
            ...(def.borderColor || def.borderWidth ? { ...borderStyle(def) } : {}),
            ...(def.borderColor || def.borderWidth ? { p: framePadding(def) } : {}),
            ...(elementOpacity(def) !== undefined ? { opacity: elementOpacity(def) } : {}),
          }}
        >
          {def.text || t('renderer.placeholder.text')}
        </Typography>
      );

    case 'button':
      return def.variant === 'link' ? (
        <Typography
          component="a"
          href={def.href || '#'}
          target={def.href && !def.href.startsWith('#') ? '_blank' : undefined}
          rel="noopener noreferrer"
          sx={{
            color: def.color || 'primary.main',
            textAlign: alignMap[def.align ?? 'left'],
            display: 'inline-block',
            pointerEvents: preview ? 'auto' : 'none',
            ...(def.borderColor || def.borderWidth ? { ...borderStyle(def) } : {}),
            ...(def.borderColor || def.borderWidth ? { p: framePadding(def) } : {}),
            ...(elementOpacity(def) !== undefined ? { opacity: elementOpacity(def) } : {}),
          }}
        >
          {def.label || t('renderer.placeholder.button')}
        </Typography>
      ) : (
        <Box sx={{ textAlign: alignMap[def.align ?? 'left'] }}>
          <Button
            variant={def.variant === 'outline' ? 'outlined' : 'contained'}
            href={def.href || '#'}
            target={def.href && !def.href.startsWith('#') ? '_blank' : undefined}
            rel="noopener noreferrer"
            size="medium"
            sx={{
              pointerEvents: preview ? 'auto' : 'none',
              textTransform: 'none',
              borderRadius: 1.5,
              ...(def.color
                ? {
                    bgcolor: def.variant === 'outline' ? 'transparent' : def.color,
                    color: '#fff',
                    borderColor: def.color,
                  }
                : {}),
              ...(def.borderColor || def.borderWidth
                ? { border: `${def.borderWidth ?? 1}px solid ${def.borderColor || 'divider'}`, p: framePadding(def) }
                : {}),
              ...(elementOpacity(def) !== undefined ? { opacity: elementOpacity(def) } : {}),
            }}
          >
            {def.label || t('renderer.placeholder.button')}
          </Button>
        </Box>
      );

    case 'image': {
      // Gambar dengan frame: border + padding (jarak border→gambar) + shape (rectangle/circle) + corner radius
      const radius = frameRadius(def.shape, def.cornerRadius);
      const hasBorder = Boolean(def.borderColor || def.borderWidth);
      return (
        <Box
          sx={{
            width: '100%',
            maxWidth: 640,
            borderRadius: radius,
            ...(hasBorder ? { ...borderStyle(def) } : {}),
            ...(hasBorder ? { p: framePadding(def) } : {}),
            display: 'inline-block',
            overflow: 'hidden',
            mx: 'auto',
            bgcolor: 'background.neutral',
            ...(elementOpacity(def) !== undefined ? { opacity: elementOpacity(def) } : {}),
          }}
        >
          <Box
            component="img"
            src={def.src || imagePlaceholderSrc()}
            alt={def.alt || 'image'}
            onError={(e) => {
              (e.target as HTMLImageElement).src = imagePlaceholderSrc();
            }}
            sx={{
              display: 'block',
              width: '100%',
              aspectRatio: def.ratio || '16:9',
              objectFit: 'cover',
              borderRadius: radius,
            }}
          />
        </Box>
      );
    }

    case 'container':
      return (
        <Box
          sx={{
            width: '100%',
            py: 3,
            px: 3,
            borderRadius: frameRadius(def.shape, def.cornerRadius),
            bgcolor: def.bgcolor === 'muted' ? 'background.neutral' : 'transparent',
            ...(def.bgOpacity !== undefined && def.bgOpacity < 100
              ? { bgcolor: `rgba(0, 0, 0, ${(def.bgOpacity / 100) * 0.08})` }
              : {}),
            ...(def.borderColor || def.borderWidth ? borderStyle(def) : {}),
            border: !def.borderColor && !def.borderWidth ? '1px dashed' : undefined,
            borderColor: !def.borderColor && !def.borderWidth ? 'divider' : undefined,
            ...(def.borderColor || def.borderWidth ? { p: framePadding(def) } : {}),
            ...(elementOpacity(def) !== undefined ? { opacity: elementOpacity(def) } : {}),
          }}
        >
          {node.children && node.children.length > 0 ? (
            <Stack spacing={def.gap ?? 1.5} sx={{ alignItems: alignMap[def.align ?? 'left'] }}>
              {node.children.map((child) => (
                <ComponentRenderer key={child.id} node={child} preview={preview} />
              ))}
            </Stack>
          ) : (
            <Stack spacing={1.5} sx={{ alignItems: 'center', color: 'text.disabled', py: 2 }}>
              <Iconify
                icon="solar:box-minimalistic-bold"
                width={24}
                sx={{ color: 'text.disabled' }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {t('renderer.containerEmpty')}
              </Typography>
            </Stack>
          )}
        </Box>
      );

    case 'divider':
      return (
        <Divider
          flexItem
          sx={{
            borderBottomWidth: def.thickness === 'thin' ? 1 : 2,
            borderColor: def.borderColor || 'divider',
            my: 1,
          }}
        />
      );

    default:
      return null;
  }
}