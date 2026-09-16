import type { ComponentNode } from '../../../types/editor';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { useEditor } from '../../../store/editor-provider';
import { AlignSelect, SliderField, SectionLabel, ColorFieldWithAlpha } from './shared-fields';

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

// Ikon button yang tersedia — pakai ikon yang SUDAH terdaftar di icon-sets.
const BUTTON_ICON_OPTIONS = [
  { value: '', key: 'fields.iconNone' },
  { value: 'mdi:whatsapp', key: 'fields.iconWhatsapp' },
  { value: 'ph:globe-bold', key: 'fields.iconGlobe' },
  { value: 'solar:phone-bold', key: 'fields.iconPhone' },
  { value: 'solar:inbox-bold', key: 'fields.iconEmail' },
  { value: 'solar:forward-bold', key: 'fields.iconArrow' },
  { value: 'solar:export-bold', key: 'fields.iconExternal' },
] as const;

const ICON_POSITION_OPTIONS = [
  { value: 'left', key: 'fields.iconLeft' },
  { value: 'right', key: 'fields.iconRight' },
] as const;

const PRESET_OPTIONS = [
  { value: 'none', key: 'fields.presetNone' },
  { value: 'whatsapp', key: 'fields.presetWhatsapp' },
  { value: 'website', key: 'fields.presetWebsite' },
] as const;

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
// Fields bersama untuk border + transparansi — dipakai semua komponen.
// ----------------------------------------------------------------------

function BorderFields({ node }: { node: ComponentNode }) {
  const { t } = useTranslate('editor');
  const { updateComponentProps } = useEditor();

  return (
    <>
      <SectionLabel>{t('fields.sectionBorder')}</SectionLabel>
      <ColorFieldWithAlpha
        label={t('fields.borderColor')}
        value={node.props?.borderColor || '#e0e0e0'}
        onChange={(color) => updateComponentProps(node.id, { borderColor: color })}
      />
      <SliderField
        label={t('fields.borderWidth')}
        value={node.props?.borderWidth ?? 1}
        min={0}
        max={20}
        step={1}
        unit="px"
        onChange={(v) => updateComponentProps(node.id, { borderWidth: v })}
      />
    </>
  );
}

/** Transparansi keseluruhan elemen (opacity 0-100). */
function OpacityField({ node }: { node: ComponentNode }) {
  const { t } = useTranslate('editor');
  const { updateComponentProps } = useEditor();

  return (
    <SliderField
      label={t('fields.opacity')}
      value={node.props?.opacity ?? 100}
      min={0}
      max={100}
      step={1}
      unit="%"
      onChange={(v) => updateComponentProps(node.id, { opacity: v })}
    />
  );
}

/** Transparansi latar (bgOpacity 0-100) — button & container. */
function BgOpacityField({ node }: { node: ComponentNode }) {
  const { t } = useTranslate('editor');
  const { updateComponentProps } = useEditor();

  return (
    <SliderField
      label={t('fields.bgOpacity')}
      value={node.props?.bgOpacity ?? 100}
      min={0}
      max={100}
      step={1}
      unit="%"
      onChange={(v) => updateComponentProps(node.id, { bgOpacity: v })}
    />
  );
}

/** Ukuran elemen (width/height px) — slider + input angka. */
function SizeFields({ node }: { node: ComponentNode }) {
  const { t } = useTranslate('editor');
  const { updateComponentProps } = useEditor();
  const { width, height } = node.props ?? {};

  return (
    <>
      <SectionLabel>{t('fields.sectionSize')}</SectionLabel>
      <SliderField
        label={t('fields.width')}
        value={typeof width === 'number' ? width : 0}
        min={0}
        max={800}
        step={1}
        unit="px"
        onChange={(v) => updateComponentProps(node.id, { width: v })}
      />
      <SliderField
        label={t('fields.height')}
        value={typeof height === 'number' ? height : 0}
        min={0}
        max={600}
        step={1}
        unit="px"
        onChange={(v) => updateComponentProps(node.id, { height: v })}
      />
    </>
  );
}

// ----------------------------------------------------------------------

/** Control ikon & preset untuk button — ala Carrd (WA + Globe link).
 *  Preset mengisi href otomatis dari nomor/pesan; user tetap bisa edit manual. */
function ButtonIconAndPresetFields({ node }: { node: ComponentNode }) {
  const { t } = useTranslate('editor');
  const { updateComponentProps } = useEditor();
  const props = node.props ?? {};
  const set = (partial: Record<string, unknown>) => updateComponentProps(node.id, partial as never);

  const [preset, setPreset] = useState(presetFromHref(props.href ?? ''));
  const [waPhone, setWaPhone] = useState(extractWaPhone(props.href ?? ''));
  const [waMessage, setWaMessage] = useState(extractWaText(props.href ?? ''));

  // Regenerasi href saat user mengetik nomor/pesan (hanya untuk preset WA aktif).
  useEffect(() => {
    if (preset !== 'whatsapp') return;
    const phone = waPhone.replace(/[^0-9]/g, '');
    const text = waMessage.trim();
    const query = text ? `&text=${encodeURIComponent(text)}` : '';
    set({ href: `https://api.whatsapp.com/send/?phone=${phone}${query}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, waPhone, waMessage]);

  const applyPreset = (next: string) => {
    setPreset(next);
    if (next === 'whatsapp') {
      const phone = waPhone.replace(/[^0-9]/g, '');
      const text = waMessage.trim();
      const query = text ? `&text=${encodeURIComponent(text)}` : '';
      set({
        href: `https://api.whatsapp.com/send/?phone=${phone}${query}`,
        icon: 'mdi:whatsapp',
        iconPosition: 'right',
      });
    } else if (next === 'website') {
      set({ href: 'https://', icon: 'ph:globe-bold', iconPosition: 'right' });
    } else {
      set({ href: '#', icon: '', iconPosition: 'left' });
    }
  };

  return (
    <>
      <TextField
        select
        fullWidth
        size="small"
        label={t('fields.preset')}
        value={preset}
        onChange={(e) => applyPreset(e.target.value)}
      >
        {PRESET_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {t(opt.key)}
          </MenuItem>
        ))}
      </TextField>

      {/* Input tambahan untuk preset WhatsApp */}
      {preset === 'whatsapp' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            label={t('fields.phone')}
            value={waPhone}
            onChange={(e) => setWaPhone(e.target.value)}
            helperText={t('preset.waHelper')}
          />
          <TextField
            fullWidth
            size="small"
            label={t('fields.waMessage')}
            value={waMessage}
            onChange={(e) => setWaMessage(e.target.value)}
          />
        </Box>
      )}

      <TextField
        select
        fullWidth
        size="small"
        label={t('fields.icon')}
        value={props.icon ?? ''}
        onChange={(e) => set({ icon: e.target.value })}
      >
        {BUTTON_ICON_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {t(opt.key)}
          </MenuItem>
        ))}
      </TextField>

      {/* Posisi & ukuran ikon — hanya saat ikon terisi */}
      {props.icon && (
        <>
          <TextField
            select
            fullWidth
            size="small"
            label={t('fields.iconPosition')}
            value={props.iconPosition ?? 'left'}
            onChange={(e) => set({ iconPosition: e.target.value as 'left' | 'right' })}
          >
            {ICON_POSITION_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.key)}
              </MenuItem>
            ))}
          </TextField>
          <SliderField
            label={t('fields.iconSize')}
            value={props.iconSize ?? 18}
            min={12}
            max={32}
            step={1}
            unit="px"
            onChange={(v) => set({ iconSize: v })}
          />
        </>
      )}
    </>
  );
}

/** Deteksi preset dari href (untuk menampilkan nilai select yang sesuai). */
function presetFromHref(href: string): string {
  if (href.includes('api.whatsapp.com/send/?phone=')) return 'whatsapp';
  if (href.startsWith('http')) return 'website';
  return 'none';
}

/** Ekstrak nomor dari href WA. */
function extractWaPhone(href: string): string {
  const m = href.match(/phone=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : '';
}

/** Ekstrak pesan (text) dari href WA. */
function extractWaText(href: string): string {
  const m = href.match(/text=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : '';
}

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
          <SectionLabel>{t('fields.sectionText')}</SectionLabel>
          <ColorFieldWithAlpha
            label={t('fields.color')}
            value={props.color || '#000000'}
            onChange={(color) => set({ color })}
          />
          <OpacityField node={node} />
          <BorderFields node={node} />
          <SizeFields node={node} />
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
          <SectionLabel>{t('fields.sectionText')}</SectionLabel>
          <ColorFieldWithAlpha
            label={t('fields.color')}
            value={props.color || '#000000'}
            onChange={(color) => set({ color })}
          />
          <OpacityField node={node} />
          <BorderFields node={node} />
          <SizeFields node={node} />
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
          <ButtonIconAndPresetFields node={node} />
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
          <SectionLabel>{t('fields.sectionColor')}</SectionLabel>
          <ColorFieldWithAlpha
            label={t('fields.color')}
            value={props.color || '#00a76f'}
            onChange={(color) => set({ color })}
          />
          <BgOpacityField node={node} />
          <OpacityField node={node} />
          <BorderFields node={node} />
          <SizeFields node={node} />
          <SectionLabel>{t('fields.sectionPadding')}</SectionLabel>
          <SliderField
            label={t('fields.padding')}
            value={props.padding ?? 0}
            min={0}
            max={100}
            step={1}
            unit="px"
            onChange={(v) => set({ padding: v })}
            // helperText={t('fields.paddingHelper')}
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
            <SliderField
              label={t('fields.cornerRadius')}
              value={props.cornerRadius ?? 0}
              min={0}
              max={100}
              step={1}
              unit="px"
              onChange={(v) => set({ cornerRadius: v })}
            />
          )}
          <OpacityField node={node} />
          <BorderFields node={node} />
          <SizeFields node={node} />
          <SectionLabel>{t('fields.sectionPadding')}</SectionLabel>
          <SliderField
            label={t('fields.padding')}
            value={props.padding ?? 0}
            min={0}
            max={100}
            step={1}
            unit="px"
            onChange={(v) => set({ padding: v })}
            // helperText={t('fields.paddingImageHelper')}
          />
        </Box>
      );

    case 'container':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SectionLabel>{t('fields.sectionColor')}</SectionLabel>
          {/* Warna latar container + fade (alpha). bgColor baru; fallback
              ke bgcolor lama bila belum diset. */}
          <ColorFieldWithAlpha
            label={t('fields.bgColor')}
            value={props.bgColor ?? '#ffffff'}
            alpha={props.bgOpacity ?? 100}
            onAlphaChange={(alpha) => set({ bgOpacity: alpha })}
            onChange={(color) => set({ bgColor: color })}
          />
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
            <SliderField
              label={t('fields.cornerRadius')}
              value={props.cornerRadius ?? 0}
              min={0}
              max={100}
              step={1}
              unit="px"
              onChange={(v) => set({ cornerRadius: v })}
            />
          )}
          <SectionLabel>{t('fields.sectionLayout')}</SectionLabel>
          <AlignSelect node={node} />
          <SliderField
            label={t('fields.gap')}
            value={props.gap ?? 12}
            min={0}
            max={60}
            step={1}
            unit="px"
            onChange={(v) => set({ gap: v })}
          />
          <SliderField
            label={t('fields.padding')}
            value={props.padding ?? 16}
            min={0}
            max={100}
            step={1}
            unit="px"
            onChange={(v) => set({ padding: v })}
            // helperText={t('fields.paddingHelper')}
          />
          <OpacityField node={node} />
          <BorderFields node={node} />
          <SizeFields node={node} />
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
          <ColorFieldWithAlpha
            label={t('fields.borderColor')}
            value={props.borderColor || '#e0e0e0'}
            onChange={(color) => set({ borderColor: color })}
          />
          <OpacityField node={node} />
          <SizeFields node={node} />
        </Box>
      );

    default:
      return null;
  }
}
