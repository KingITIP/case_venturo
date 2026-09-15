import type { LandingFeatureItem } from '../../data/landing';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';
import { varFade, MotionViewport } from 'src/shared/ui/animate';

import { landingFeatureItems } from '../../data/landing';
import { LandingSectionHeading } from './landing-section-heading';

// ----------------------------------------------------------------------

export function LandingFeatures() {
  const { t } = useTranslate('landing');

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <LandingSectionHeading
          badge={t('features.badge')}
          title={t('features.title')}
          subtitle={t('features.subtitle')}
        />

        <Box
          component={MotionViewport}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 6,
          }}
        >
          {landingFeatureItems.map((item) => (
            <FeatureCard key={item.id} item={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function FeatureCard({ item }: { item: LandingFeatureItem }) {
  const { t } = useTranslate('landing');

  return (
    <m.div variants={varFade('inUp')} style={{ height: '100%' }}>
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          p: 4,
          textAlign: 'center',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => theme.shadows[12],
          },
        }}
      >
        <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: (theme) => theme.palette.primary.lighter,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <Iconify icon={item.icon} width={32} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {t(item.titleKey)}
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {t(item.descriptionKey)}
          </Typography>
        </Stack>
      </Card>
    </m.div>
  );
}
