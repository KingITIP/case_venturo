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

function imagePlaceholderSrc() {
  // Data URI SVG abu-abu dengan ikon — offline-friendly
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="#e0e0e0"/><text x="50%" y="50%" font-family="sans-serif" font-size="28" fill="#9e9e9e" text-anchor="middle">Gambar</text></svg>`
  )}`;
}

/** Render satu node komponen menjadi tampilan halaman (WYSIWYG). */
export function ComponentRenderer({ node }: { node: ComponentNode }) {
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
            color: def.color || 'text.primary',
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
            color: def.color || 'text.primary',
            maxWidth: 640,
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
          sx={{
            color: def.color || 'primary.main',
            textAlign: alignMap[def.align ?? 'left'],
            display: 'inline-block',
            pointerEvents: 'none',
          }}
        >
          {def.label || t('renderer.placeholder.button')}
        </Typography>
      ) : (
        <Box sx={{ textAlign: alignMap[def.align ?? 'left'] }}>
          <Button
            variant={def.variant === 'outline' ? 'outlined' : 'contained'}
            href={def.href || '#'}
            size="medium"
            sx={{
              pointerEvents: 'none',
              textTransform: 'none',
              borderRadius: 1.5,
              ...(def.color ? { bgcolor: def.variant === 'outline' ? 'transparent' : def.color, color: '#fff', borderColor: def.color } : {}),
            }}
          >
            {def.label || t('renderer.placeholder.button')}
          </Button>
        </Box>
      );

    case 'image':
      return (
        <Box
          component="img"
          src={def.src || imagePlaceholderSrc()}
          alt={def.alt || 'image'}
          onError={(e) => {
            (e.target as HTMLImageElement).src = imagePlaceholderSrc();
          }}
          sx={{
            width: '100%',
            maxWidth: 640,
            aspectRatio: def.ratio || '16:9',
            objectFit: 'cover',
            borderRadius: 1.5,
            display: 'block',
            mx: 'auto',
            bgcolor: 'background.neutral',
            ...(def.borderColor || def.borderWidth ? { ...borderStyle(def), borderRadius: 1.5 } : {}),
          }}
        />
      );

    case 'container':
      return (
        <Box
          sx={{
            width: '100%',
            py: 3,
            px: 3,
            borderRadius: 2,
            bgcolor: def.bgcolor === 'muted' ? 'background.neutral' : 'transparent',
            ...(def.borderColor || def.borderWidth ? borderStyle(def) : {}),
            border: !def.borderColor && !def.borderWidth ? '1px dashed' : undefined,
            borderColor: !def.borderColor && !def.borderWidth ? 'divider' : undefined,
          }}
        >
          <Stack spacing={1.5} sx={{ alignItems: alignMap[def.align ?? 'left'] }}>
            <Iconify
              icon="solar:box-minimalistic-bold"
              width={24}
              sx={{ color: 'text.disabled' }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('renderer.containerLabel')}
            </Typography>
          </Stack>
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
