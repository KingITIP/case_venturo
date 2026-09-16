import type { ReactNode } from 'react';
import type { ComponentNode } from '../../../types/editor';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useTranslate } from 'src/locales';

import { useEditor } from '../../../store/editor-provider';

// ----------------------------------------------------------------------

type FieldProps = {
  node: ComponentNode;
};

const ALIGN_OPTIONS = [
  { value: 'left', key: 'fields.alignLeft' },
  { value: 'center', key: 'fields.alignCenter' },
  { value: 'right', key: 'fields.alignRight' },
] as const;

function AlignSelect({ node }: FieldProps) {
  const { t } = useTranslate('editor');
  const { updateComponentProps } = useEditor();
  const align = node.props?.align ?? 'left';

  return (
    <TextField
      select
      fullWidth
      size="small"
      label={t('fields.align')}
      value={align}
      onChange={(e) =>
        updateComponentProps(node.id, { align: e.target.value as 'left' | 'center' | 'right' })
      }
    >
      {ALIGN_OPTIONS.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {t(opt.key)}
        </MenuItem>
      ))}
    </TextField>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
      {children}
    </Typography>
  );
}

// ----------------------------------------------------------------------
// SliderField — slider + angka + satuan (ala Carrd: drag slider, nilai tetap
// bisa diketik presisi). Dipakai untuk semua nilai numerik properti.
// ----------------------------------------------------------------------

export type SliderFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

export function SliderField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
}: SliderFieldProps) {
  const parsed = Number.isFinite(value) ? value : min;

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Typography variant="body2" sx={{ minWidth: 0, flex: '1 1 auto' }}>
          {label}
        </Typography>
        <TextField
          size="small"
          type="number"
          value={parsed}
          onChange={(e) => onChange(Number(e.target.value))}
          slotProps={{
            htmlInput: { min, max, step },
            input: {
              endAdornment: unit ? (
                <InputAdornment position="end">{unit}</InputAdornment>
              ) : undefined,
            },
          }}
          sx={{ width: 110 }}
        />
      </Stack>
      <Slider
        size="small"
        value={parsed}
        min={min}
        max={max}
        step={step}
        onChange={(_, v) => onChange(Array.isArray(v) ? v[0] : v)}
        aria-label={label}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------
// ColorFieldWithAlpha — input warna hex + swatch + slider transparansi (%).
// Nilai disimpan sebagai hex (warna) + alpha terpisah (0-100) — renderer
// menggabungkan via fromHexWithAlpha / rgba.
// ----------------------------------------------------------------------

type ColorFieldWithAlphaProps = {
  label: string;
  value: string;
  /** Transparansi 0-100 (100 = solid). Opsional — kalau tidak ada, field tanpa slider. */
  alpha?: number;
  onAlphaChange?: (alpha: number) => void;
  onChange: (color: string) => void;
};

export function ColorFieldWithAlpha({
  label,
  value,
  alpha,
  onAlphaChange,
  onChange,
}: ColorFieldWithAlphaProps) {
  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component="input"
                type="color"
                value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#ffffff'}
                onChange={(e) => onChange(e.target.value)}
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: 1,
                  border: 'none',
                  background: 'none',
                  p: 0,
                  cursor: 'pointer',
                }}
              />
            </InputAdornment>
          ),
        }}
      />
      {alpha !== undefined && onAlphaChange && (
        <SliderField
          label=""
          value={alpha}
          min={0}
          max={100}
          step={1}
          unit="%"
          onChange={onAlphaChange}
        />
      )}
    </Box>
  );
}

export { AlignSelect, SectionLabel };
