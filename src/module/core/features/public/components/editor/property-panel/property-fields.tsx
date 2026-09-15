import type { ComponentNode } from '../../../types/editor';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { useTranslate } from 'src/locales';

import { AlignSelect } from './shared-fields';
import { useEditor } from '../../../store/editor-provider';

// ----------------------------------------------------------------------

const LEVEL_OPTIONS = [
  { value: 1, key: 'editor.fields.levelH1' },
  { value: 2, key: 'editor.fields.levelH2' },
  { value: 3, key: 'editor.fields.levelH3' },
] as const;

const VARIANT_OPTIONS = [
  { value: 'filled', key: 'editor.fields.variantFilled' },
  { value: 'outline', key: 'editor.fields.variantOutline' },
  { value: 'link', key: 'editor.fields.variantLink' },
] as const;

const BGMUTED_OPTIONS = [
  { value: 'transparent', key: 'editor.fields.bgTransparent' },
  { value: 'muted', key: 'editor.fields.bgMuted' },
] as const;

const THICKNESS_OPTIONS = [
  { value: 'thin', key: 'editor.fields.thicknessThin' },
  { value: 'medium', key: 'editor.fields.thicknessMedium' },
] as const;

const RATIO_OPTIONS = [
  { value: '16:9', key: 'editor.fields.ratioWide' },
  { value: '4:3', key: 'editor.fields.ratioClassic' },
  { value: '1:1', key: 'editor.fields.ratioSquare' },
] as const;

// ----------------------------------------------------------------------

/** Form properti per tipe komponen — semua perubahan langsung update state (live). */
export function PropertyFields({ node }: { node: ComponentNode }) {
  const { t } = useTranslate('editor');
  const { updateComponentProps } = useEditor();
  const { type, props = {} } = node;
  const set = (partial: Record<string, unknown>) => updateComponentProps(node.id, partial as never);

  switch (type) {
    case 'heading':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            label={t('editor.fields.text')}
            value={props.text ?? ''}
            onChange={(e) => set({ text: e.target.value })}
          />
          <AlignSelect node={node} />
          <TextField
            select
            fullWidth
            size="small"
            label={t('editor.fields.level')}
            value={props.level ?? 2}
            onChange={(e) => set({ level: Number(e.target.value) as 1 | 2 | 3 })}
          >
            {LEVEL_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      );

    case 'text':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            multiline
            minRows={3}
            label={t('editor.fields.text')}
            value={props.text ?? ''}
            onChange={(e) => set({ text: e.target.value })}
          />
          <AlignSelect node={node} />
        </Box>
      );

    case 'button':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            label={t('editor.fields.label')}
            value={props.label ?? ''}
            onChange={(e) => set({ label: e.target.value })}
          />
          <TextField
            fullWidth
            size="small"
            label={t('editor.fields.href')}
            value={props.href ?? '#'}
            onChange={(e) => set({ href: e.target.value })}
          />
          <TextField
            select
            fullWidth
            size="small"
            label={t('editor.fields.variant')}
            value={props.variant ?? 'filled'}
            onChange={(e) => set({ variant: e.target.value as 'filled' | 'outline' | 'link' })}
          >
            {VARIANT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      );

    case 'image':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            label={t('editor.fields.src')}
            value={props.src ?? ''}
            onChange={(e) => set({ src: e.target.value })}
            helperText={t('editor.fields.srcHelper')}
          />
          <TextField
            fullWidth
            size="small"
            label={t('editor.fields.alt')}
            value={props.alt ?? ''}
            onChange={(e) => set({ alt: e.target.value })}
          />
          <TextField
            select
            fullWidth
            size="small"
            label={t('editor.fields.ratio')}
            value={props.ratio ?? '16:9'}
            onChange={(e) => set({ ratio: e.target.value })}
          >
            {RATIO_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      );

    case 'container':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label={t('editor.fields.bgcolor')}
            value={props.bgcolor ?? 'transparent'}
            onChange={(e) => set({ bgcolor: e.target.value as 'transparent' | 'muted' })}
          >
            {BGMUTED_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      );

    case 'divider':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label={t('editor.fields.thickness')}
            value={props.thickness ?? 'medium'}
            onChange={(e) => set({ thickness: e.target.value as 'thin' | 'medium' })}
          >
            {THICKNESS_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      );

    default:
      return null;
  }
}
