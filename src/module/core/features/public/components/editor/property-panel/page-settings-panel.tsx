import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

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

/** Upload gambar latar halaman dari file lokal → data URL (page.bgImage). */
function PageBgImageField() {
  const { t } = useTranslate('editor');
  const { page, updatePage } = useEditor();

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updatePage({ bgImage: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <input
        accept="image/*"
        id="page-bg-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
      <label htmlFor="page-bg-upload">
        <Button
          component="span"
          variant="outlined"
          size="small"
          fullWidth
          startIcon={<Iconify icon="solar:download-bold" width={16} />}
        >
          {t('page.uploadBgImage')}
        </Button>
      </label>
      {page.bgImage && (
        <Button
          size="small"
          color="error"
          variant="text"
          onClick={() => updatePage({ bgImage: undefined })}
        >
          {t('page.removeBgImage')}
        </Button>
      )}
    </Box>
  );
}

/** Panel pengaturan seluruh halaman (dipilih via klik area kosong / latar). */
export function PageSettingsPanel() {
  const { t } = useTranslate('editor');
  const { page, updatePage } = useEditor();
  const opacity = page.fadeOpacity ?? 0;

  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {t('page.title')}
          </Typography>
        </Stack>

        <PageBgImageField />

        <ColorField
          label={t('page.backgroundColor')}
          value={page.backgroundColor}
          onChange={(color) => updatePage({ backgroundColor: color })}
        />

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={Boolean(page.gradientEnabled)}
              onChange={(e) => updatePage({ gradientEnabled: e.target.checked })}
            />
          }
          label={<Typography variant="body2">{t('page.gradientEnable')}</Typography>}
        />
        {page.gradientEnabled && (
          <>
            <ColorField
              label={t('page.gradientFrom')}
              value={page.gradientFrom ?? '#ffffff'}
              onChange={(color) => updatePage({ gradientFrom: color })}
            />
            <ColorField
              label={t('page.gradientTo')}
              value={page.gradientTo ?? '#e0e0e0'}
              onChange={(color) => updatePage({ gradientTo: color })}
            />
            <TextField
              fullWidth
              size="small"
              type="number"
              label={t('page.gradientAngle')}
              value={page.gradientAngle ?? 135}
              onChange={(e) => updatePage({ gradientAngle: Number(e.target.value) })}
              InputProps={{ endAdornment: <InputAdornment position="end">°</InputAdornment> }}
            />
          </>
        )}

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={opacity > 0}
              onChange={(e) => updatePage({ fadeOpacity: e.target.checked ? 50 : 0 })}
            />
          }
          label={<Typography variant="body2">{t('page.fadeEnable')}</Typography>}
        />
        {opacity > 0 && (
          <>
            <ColorField
              label={t('page.fadeColor')}
              value={page.fadeColor ?? '#000000'}
              onChange={(color) => updatePage({ fadeColor: color })}
            />
            <TextField
              fullWidth
              size="small"
              type="number"
              slotProps={{ htmlInput: { min: 0, max: 100 } }}
              label={t('page.fadeOpacity')}
              value={opacity}
              onChange={(e) =>
                updatePage({ fadeOpacity: Math.min(100, Math.max(0, Number(e.target.value))) })
              }
              InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
            />
          </>
        )}

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