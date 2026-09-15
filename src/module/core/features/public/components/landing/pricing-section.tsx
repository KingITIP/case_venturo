import type { LandingPricingFeature } from '../../data/landing';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';
import { varFade, MotionViewport } from 'src/shared/ui/animate';

import { landingPricingFeatures } from '../../data/landing';
import { LandingSectionHeading } from './landing-section-heading';

// ----------------------------------------------------------------------

export function LandingPricing() {
  const { t } = useTranslate('landing');

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <LandingSectionHeading
          badge={t('pricing.badge')}
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
        />

        <Box component={MotionViewport} sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <m.div variants={varFade('inUp')} style={{ width: '100%', maxWidth: 520 }}>
            <Card
              variant="outlined"
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                borderColor: (theme) => theme.palette.primary.main,
                borderWidth: 2,
                boxShadow: (theme) => theme.shadows[16],
              }}
            >
              <Stack spacing={3} sx={{ alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {t('pricing.planName')}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
                  <Typography variant="h2" sx={{ fontWeight: 800 }}>
                    {t('pricing.price')}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    {t('pricing.pricePeriod')}
                  </Typography>
                </Stack>

                <Box
                  component="ul"
                  sx={{
                    width: 1,
                    m: 0,
                    p: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  {landingPricingFeatures.map((feature) => (
                    <PricingFeatureRow key={feature.id} feature={feature} />
                  ))}
                </Box>

                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {t('pricing.trialNote')}
                </Typography>

                <Button
                  component={RouterLink}
                  href={paths.public.build}
                  size="large"
                  variant="contained"
                  fullWidth
                  startIcon={<Iconify icon="solar:cup-star-bold" width={20} />}
                >
                  {t('pricing.cta')}
                </Button>
              </Stack>
            </Card>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PricingFeatureRow({ feature }: { feature: LandingPricingFeature }) {
  const { t } = useTranslate('landing');

  return (
    <Box
      component="li"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        textAlign: 'left',
      }}
    >
      <Iconify
        icon="solar:check-circle-bold"
        width={20}
        sx={{ color: 'primary.main', flexShrink: 0 }}
      />
      <Typography variant="body2">{t(feature.labelKey)}</Typography>
    </Box>
  );
}
