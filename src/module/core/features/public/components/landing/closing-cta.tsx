import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';
import { varFade, MotionViewport } from 'src/shared/ui/animate';

// ----------------------------------------------------------------------

export function LandingClosingCta() {
  const { t } = useTranslate('landing');

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <MotionViewport>
          <m.div variants={varFade('inUp')}>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                p: { xs: 6, md: 10 },
                textAlign: 'center',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'primary.contrastText',
              }}
            >
              <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                  {t('closingCta.title')}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.85 }}>
                  {t('closingCta.subtitle')}
                </Typography>

                <Button
                  component={RouterLink}
                  href={paths.public.build}
                  size="large"
                  variant="contained"
                  color="inherit"
                  sx={{ mt: 2, bgcolor: 'background.paper', color: 'text.primary' }}
                  startIcon={<Iconify icon="solar:pen-bold" width={20} />}
                >
                  {t('closingCta.cta')}
                </Button>
              </Stack>
            </Box>
          </m.div>
        </MotionViewport>
      </Container>
    </Box>
  );
}
