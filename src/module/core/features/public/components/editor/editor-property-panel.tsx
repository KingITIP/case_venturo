import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

// ----------------------------------------------------------------------

export function EditorPropertyPanel() {
  const { t } = useTranslate('editor');

  return (
    <Box component="aside" aria-label={t('properties.title')} sx={{ width: 1 }}>
      <Typography
        variant="overline"
        sx={{ color: 'text.secondary', px: 2, py: 1, display: 'block' }}
      >
        {t('properties.title')}
      </Typography>

      <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', px: 3, py: 8 }}>
        <Iconify icon="solar:settings-bold" width={32} sx={{ color: 'text.disabled' }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {t('properties.emptyTitle')}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {t('properties.emptyDescription')}
        </Typography>
      </Stack>
    </Box>
  );
}
