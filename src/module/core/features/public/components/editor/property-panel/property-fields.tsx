import type { ComponentNode } from '../../../types/editor';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { ColorField } from './page-settings-panel';
import { useEditor } from '../../../store/editor-provider';
import { AlignSelect, SectionLabel } from './shared-fields';

// ----------------------------------------------------------------------

const LEVEL_OPTIONS = [
  { value: 1, key: 'fields.levelH1' },
  { value: 2, key: 'fields.levelH2' },
  { value: 3, key: 'fields.levelH3' },
] as const;

const VARIANT_OPTIONS = [
  { value: 'filled', key: 'fields.variantFilled' },
  { value: 'outline', key: 'fields.variantOutline' },
  { value: 'link', key: 'fields.variantLink' },
] as const;

const BGMUTED_OPTIONS = [
  { value: 'transparent', key: 'fields.bgTransparent' },
  { value: 'muted', key: 'fields.bgMuted' },
] as const;

const THICKNESS_OPTIONS = [
  { value: 'thin', key: 'fields.thicknessThin' },
  { value: 'medium', key: 'fields.thicknessMedium' },
] as const;

const RATIO_OPTIONS = [
  { value: '16:9', key: 'fields.ratioWide' },
  { value: '4:3', key: 'fields.ratioClassic' },
  { value: '1:1', key: 'fields.ratioSquare' },
] as const;

const SHAPE_OPTIONS = [
  { value: 'rectangle', key: 'fields.shapeRectangle' },
  { value: 'circle', key: 'fields.shapeCircle' },
] as const;

// ----------------------------------------------------------------------

/** Field upload gambar dari file lokal → data URL (disimpan di props.src). */
function ImageUploadField({ node }: { node: ComponentNode }) {
  const { t } = useTranslate('editor');
  const { updateComponentProps } = useEditor();

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateComponentProps(node.id, { src: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box>
      <input
        accept="image/*"
        id={`img-upload-${node.id}`}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
      <label htmlFor={`img-upload-${node.id}`}>
        <Button
          component="span"
          variant="outlined"
          size="small"
          fullWidth
          startIcon={<Iconify icon="solar:download-bold" width={16} />}
        >
          {t('fields.uploadImage')}
        </Button>
      </label>
    </Box>
  );
}

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
            label={t('fields.text')}
            value={props.text ?? ''}
            onChange={(e) => set({ text: e.target.value })}
          />
          <AlignSelect node={node} />
          <TextField
            select
            fullWidth
            size="small"
            label={t('fields.level')}
            value={props.level ?? 2}
            onChange={(e) => set({ level: Number(e.target.value) as 1 | 2 | 3 })}
          >
            {LEVEL_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
          <ColorField
            label={t('fields.color')}
            value={props.color || '#000000'}
            onChange={(color) => set({ color })}
          />
          <SectionLabel>{t('fields.sectionBorder')}</SectionLabel>
          <ColorField
            label={t('fields.borderColor')}
            value={props.borderColor || '#e0e0e0'}
            onChange={(color) => set({ borderColor: color })}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label={t('fields.borderWidth')}
            value={props.borderWidth ?? 1}
            onChange={(e) => set({ borderWidth: Number(e.target.value) })}
          />
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
            label={t('fields.text')}
            value={props.text ?? ''}
            onChange={(e) => set({ text: e.target.value })}
          />
          <AlignSelect node={node} />
          <ColorField
            label={t('fields.color')}
            value={props.color || '#000000'}
            onChange={(color) => set({ color })}
          />
          <SectionLabel>{t('fields.sectionBorder')}</SectionLabel>
          <ColorField
            label={t('fields.borderColor')}
            value={props.borderColor || '#e0e0e0'}
            onChange={(color) => set({ borderColor: color })}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label={t('fields.borderWidth')}
            value={props.borderWidth ?? 1}
            onChange={(e) => set({ borderWidth: Number(e.target.value) })}
          />
        </Box>
      );

    case 'button':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            label={t('fields.label')}
            value={props.label ?? ''}
            onChange={(e) => set({ label: e.target.value })}
          />
          <TextField
            fullWidth
            size="small"
            label={t('fields.href')}
            value={props.href ?? '#'}
            onChange={(e) => set({ href: e.target.value })}
            helperText={t('fields.hrefHelper')}
          />
          <TextField
            select
            fullWidth
            size="small"
            label={t('fields.variant')}
            value={props.variant ?? 'filled'}
            onChange={(e) => set({ variant: e.target.value as 'filled' | 'outline' | 'link' })}
          >
            {VARIANT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
          <ColorField
            label={t('fields.color')}
            value={props.color || '#00a76f'}
            onChange={(color) => set({ color })}
          />
          <SectionLabel>{t('fields.sectionBorder')}</SectionLabel>
          <ColorField
            label={t('fields.borderColor')}
            value={props.borderColor || '#e0e0e0'}
            onChange={(color) => set({ borderColor: color })}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label={t('fields.borderWidth')}
            value={props.borderWidth ?? 1}
            onChange={(e) => set({ borderWidth: Number(e.target.value) })}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label={t('fields.padding')}
            value={props.padding ?? 0}
            onChange={(e) => set({ padding: Number(e.target.value) })}
            helperText={t('fields.paddingHelper')}
          />
        </Box>
      );

    case 'image':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ImageUploadField node={node} />
          <TextField
            fullWidth
            size="small"
            label={t('fields.src')}
            value={props.src ?? ''}
            onChange={(e) => set({ src: e.target.value })}
            helperText={t('fields.srcHelper')}
          />
          <TextField
            fullWidth
            size="small"
            label={t('fields.alt')}
            value={props.alt ?? ''}
            onChange={(e) => set({ alt: e.target.value })}
          />
          <TextField
            select
            fullWidth
            size="small"
            label={t('fields.ratio')}
            value={props.ratio ?? '16:9'}
            onChange={(e) => set({ ratio: e.target.value })}
          >
            {RATIO_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            size="small"
            label={t('fields.shape')}
            value={props.shape ?? 'rectangle'}
            onChange={(e) => set({ shape: e.target.value as 'rectangle' | 'circle' })}
          >
            {SHAPE_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
          {props.shape !== 'circle' && (
            <TextField
              fullWidth
              size="small"
              type="number"
              label={t('fields.cornerRadius')}
              value={props.cornerRadius ?? 0}
              onChange={(e) => set({ cornerRadius: Number(e.target.value) })}
            />
          )}
          <SectionLabel>{t('fields.sectionBorder')}</SectionLabel>
          <ColorField
            label={t('fields.borderColor')}
            value={props.borderColor || '#e0e0e0'}
            onChange={(color) => set({ borderColor: color })}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label={t('fields.borderWidth')}
            value={props.borderWidth ?? 1}
            onChange={(e) => set({ borderWidth: Number(e.target.value) })}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label={t('fields.padding')}
            value={props.padding ?? 0}
            onChange={(e) => set({ padding: Number(e.target.value) })}
            helperText={t('fields.paddingImageHelper')}
          />
        </Box>
      );

    case 'container':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label={t('fields.bgcolor')}
            value={props.bgcolor ?? 'transparent'}
            onChange={(e) => set({ bgcolor: e.target.value as 'transparent' | 'muted' })}
          >
            {BGMUTED_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            size="small"
            label={t('fields.shape')}
            value={props.shape ?? 'rectangle'}
            onChange={(e) => set({ shape: e.target.value as 'rectangle' | 'circle' })}
          >
            {SHAPE_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
          {props.shape !== 'circle' && (
            <TextField
              fullWidth
              size="small"
              type="number"
              label={t('fields.cornerRadius')}
              value={props.cornerRadius ?? 0}
              onChange={(e) => set({ cornerRadius: Number(e.target.value) })}
            />
          )}
          <SectionLabel>{t('fields.sectionBorder')}</SectionLabel>
          <ColorField
            label={t('fields.borderColor')}
            value={props.borderColor || '#e0e0e0'}
            onChange={(color) => set({ borderColor: color })}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label={t('fields.borderWidth')}
            value={props.borderWidth ?? 1}
            onChange={(e) => set({ borderWidth: Number(e.target.value) })}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label={t('fields.padding')}
            value={props.padding ?? 0}
            onChange={(e) => set({ padding: Number(e.target.value) })}
            helperText={t('fields.paddingHelper')}
          />
        </Box>
      );

    case 'divider':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label={t('fields.thickness')}
            value={props.thickness ?? 'medium'}
            onChange={(e) => set({ thickness: e.target.value as 'thin' | 'medium' })}
          >
            {THICKNESS_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
          <ColorField
            label={t('fields.borderColor')}
            value={props.borderColor || '#e0e0e0'}
            onChange={(color) => set({ borderColor: color })}
          />
        </Box>
      );

    default:
      return null;
  }
}
