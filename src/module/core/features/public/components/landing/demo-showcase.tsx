import type { LandingDemoItem } from '../../data/landing';

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

import { landingDemoItems } from '../../data/landing';
import { LandingSectionHeading } from './landing-section-heading';

// ----------------------------------------------------------------------

export function LandingDemoShowcase() {
  const { t } = useTranslate('landing');

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <LandingSectionHeading
          badge={t('demo.badge')}
          title={t('demo.title')}
          subtitle={t('demo.subtitle')}
        />

        <Box
          component={MotionViewport}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
            mt: 6,
          }}
        >
          {landingDemoItems.map((item, index) => (
            <DemoCard key={item.id} item={item} index={index} />
          ))}
        </Box>

        <Stack sx={{ alignItems: 'center', mt: 5 }}>
          <Button
            component={RouterLink}
            href={paths.public.build}
            size="large"
            variant="outlined"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={20} />}
          >
            {t('demo.viewAll')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function DemoCard({ item, index }: { item: LandingDemoItem; index: number }) {
  const { t } = useTranslate('landing');

  return (
    <Box
      component={RouterLink}
      href={paths.public.build}
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover .demo-thumb': {
          transform: 'scale(1.03) rotate(0deg)',
          boxShadow: (theme) => theme.shadows[20],
        },
      }}
    >
      <m.div
        variants={varFade('inUp')}
        style={{ height: '100%' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Box
          className="demo-thumb"
          sx={{
            aspectRatio: '4 / 3',
            borderRadius: 3,
            background: item.gradient,
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* decorative circles */}
          <Box
            sx={{
              position: 'absolute',
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.14)',
              top: -40,
              right: -30,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              bottom: -20,
              left: -10,
            }}
          />
          <Stack spacing={1.5} sx={{ alignItems: 'center', color: '#fff', zIndex: 1 }}>
            <Iconify icon={item.icon} width={40} />
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
              {t(item.labelKey)}
            </Typography>
          </Stack>
        </Box>
      </m.div>
    </Box>
  );
}
