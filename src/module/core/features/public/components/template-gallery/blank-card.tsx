import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { BLANK_TEMPLATE_ID } from '../../data/build';

// ----------------------------------------------------------------------

export function BlankCard() {
  const { t } = useTranslate('build');

  return (
    <Box
      component={RouterLink}
      href={paths.public.editor(BLANK_TEMPLATE_ID)}
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        '&:hover .blank-thumb': {
          bgcolor: 'action.hover',
        },
        '&:hover .blank-overlay': {
          opacity: 1,
        },
        '&:focus-visible': {
          outline: (theme) => `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }}
    >
      <Box
        className="blank-thumb"
        sx={{
          aspectRatio: '4 / 3',
          borderRadius: 3,
          border: (theme) => `2px dashed ${theme.palette.divider}`,
          bgcolor: 'background.neutral',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.25s ease',
        }}
      >
        <Stack spacing={1.5} sx={{ alignItems: 'center', color: 'text.secondary', px: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Iconify icon="solar:add-circle-bold" width={28} />
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {t('blank.name')}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 180 }}
          >
            {t('blank.description')}
          </Typography>
        </Stack>
      </Box>

      {/* Overlay "Select" */}
      <Box
        className="blank-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0,0,0,0.45)',
          opacity: 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <Stack spacing={1} sx={{ alignItems: 'center', color: '#fff' }}>
          <Iconify icon="solar:pen-bold" width={28} />
          <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700 }}>
            {t('card.select')}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
