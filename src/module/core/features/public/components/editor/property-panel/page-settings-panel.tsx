import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useTranslate } from 'src/locales';

import { useEditor } from '../../../store/editor-provider';

// ----------------------------------------------------------------------

/** Input warna hex (dengan swatch) — dipakai halaman & komponen. */
export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  return (
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
  );
}

// ----------------------------------------------------------------------

/** Panel pengaturan seluruh halaman (dipilih via klik area kosong / latar). */
export function PageSettingsPanel() {
  const { t } = useTranslate('editor');
  const { page, updatePage } = useEditor();

  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {t('page.title')}
          </Typography>
        </Stack>

        <ColorField
          label={t('page.backgroundColor')}
          value={page.backgroundColor}
          onChange={(color) => updatePage({ backgroundColor: color })}
        />

        <ColorField
          label={t('page.borderColor')}
          value={page.borderColor}
          onChange={(color) => updatePage({ borderColor: color })}
        />

        <TextField
          fullWidth
          size="small"
          type="number"
          label={t('page.borderWidth')}
          value={page.borderWidth}
          onChange={(e) => updatePage({ borderWidth: Number(e.target.value) })}
          InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment> }}
        />

        <TextField
          fullWidth
          size="small"
          type="number"
          label={t('page.maxWidth')}
          value={page.maxWidth}
          onChange={(e) => updatePage({ maxWidth: Number(e.target.value) })}
          InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment> }}
        />

        <TextField
          fullWidth
          size="small"
          type="number"
          label={t('page.padding')}
          value={page.padding}
          onChange={(e) => updatePage({ padding: Number(e.target.value) })}
          InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment> }}
        />
      </Stack>

      <Typography
        variant="caption"
        sx={{ color: 'text.disabled', display: 'block', mt: 2, textAlign: 'center' }}
      >
        {t('page.autoNote')}
      </Typography>
    </Box>
  );
}