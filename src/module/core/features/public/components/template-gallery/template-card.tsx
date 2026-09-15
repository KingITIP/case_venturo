import type { Template } from '../../data/build';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

// ----------------------------------------------------------------------

type TemplateCardProps = {
  template: Template;
};

export function TemplateCard({ template }: TemplateCardProps) {
  const { t } = useTranslate('build');

  return (
    <Box
      component={RouterLink}
      href={paths.public.editor(template.id)}
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        '&:hover .template-thumb': {
          transform: 'scale(1.04)',
        },
        '&:hover .template-overlay': {
          opacity: 1,
        },
        '&:focus-visible': {
          outline: (theme) => `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }}
    >
      <Box
        className="template-thumb"
        sx={{
          aspectRatio: '4 / 3',
          borderRadius: 3,
          background: template.gradient,
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.14)',
            top: -30,
            right: -20,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            bottom: -15,
            left: -10,
          }}
        />

        <Stack spacing={1} sx={{ alignItems: 'center', color: '#fff', zIndex: 1 }}>
          <Iconify icon={template.icon} width={40} />
          <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
            {t(template.nameKey)}
          </Typography>
        </Stack>
      </Box>

      {/* Overlay "Select" */}
      <Box
        className="template-overlay"
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
