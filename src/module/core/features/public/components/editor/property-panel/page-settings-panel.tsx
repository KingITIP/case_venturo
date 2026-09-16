import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { useEditor } from '../../../store/editor-provider';
import { SliderField, SectionLabel, ColorFieldWithAlpha } from './shared-fields';

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
  return <ColorFieldWithAlpha label={label} value={value} onChange={onChange} />;
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
  const bgFixed = page.bgFixed !== false; // default true

  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {t('page.title')}
          </Typography>
        </Stack>

        <PageBgImageField />

        {/* Background fullscreen FIXED toggle */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={bgFixed}
              onChange={(e) => updatePage({ bgFixed: e.target.checked })}
            />
          }
          label={<Typography variant="body2">{t('page.bgFixed')}</Typography>}
        />

        <SectionLabel>{t('page.sectionBackground')}</SectionLabel>

        <ColorFieldWithAlpha
          label={t('page.backgroundColor')}
          value={page.backgroundColor}
          alpha={100 - opacity}
          onAlphaChange={(alpha) => updatePage({ fadeOpacity: 100 - alpha })}
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
            <SliderField
              label={t('page.gradientAngle')}
              value={page.gradientAngle ?? 135}
              min={0}
              max={360}
              step={1}
              unit="°"
              onChange={(angle) => updatePage({ gradientAngle: angle })}
            />
          </>
        )}

        {/* Overlay gelap + opacity slider */}
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
            <SliderField
              label={t('page.fadeOpacity')}
              value={opacity}
              min={0}
              max={100}
              step={1}
              unit="%"
              onChange={(v) => updatePage({ fadeOpacity: v })}
            />
          </>
        )}

        <SectionLabel>{t('page.sectionLayout')}</SectionLabel>

        <SliderField
          label={t('page.maxWidth')}
          value={page.maxWidth}
          min={320}
          max={1280}
          step={10}
          unit="px"
          onChange={(v) => updatePage({ maxWidth: v })}
        />

        <SliderField
          label={t('page.padding')}
          value={page.padding}
          min={0}
          max={100}
          step={1}
          unit="px"
          onChange={(v) => updatePage({ padding: v })}
        />

        <SectionLabel>{t('page.sectionBorder')}</SectionLabel>

        <ColorField
          label={t('page.borderColor')}
          value={page.borderColor}
          onChange={(color) => updatePage({ borderColor: color })}
        />

        <SliderField
          label={t('page.borderWidth')}
          value={page.borderWidth}
          min={0}
          max={20}
          step={1}
          unit="px"
          onChange={(v) => updatePage({ borderWidth: v })}
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
