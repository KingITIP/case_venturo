import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { Label } from 'src/shared/ui/label';
import { Iconify } from 'src/shared/ui/iconify';
import { varFade, MotionContainer } from 'src/shared/ui/animate';

// ----------------------------------------------------------------------

export function LandingHero() {
  const { t } = useTranslate('landing');

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        pt: { xs: 8, md: 14 },
        pb: { xs: 4, md: 8 },
      }}
    >
      {/* Decorative background glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          left: '50%',
          width: 700,
          height: 700,
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.16) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container component={MotionContainer} sx={{ position: 'relative' }}>
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <m.div variants={varFade('inUp')}>
            <Label color="primary" variant="soft">
              {t('hero.badge')}
            </Label>
          </m.div>

          <m.div variants={varFade('inUp')}>
            <Typography variant="h1" sx={{ maxWidth: 760, fontWeight: 800, letterSpacing: -1.5 }}>
              {t('hero.title')}
            </Typography>
          </m.div>

          <m.div variants={varFade('inUp')}>
            <Typography
              variant="h5"
              sx={{ maxWidth: 640, color: 'text.secondary', fontWeight: 400 }}
            >
              {t('hero.subtitle')}
            </Typography>
          </m.div>

          <m.div variants={varFade('inUp')}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ alignItems: 'center' }}
            >
              <Button
                component={RouterLink}
                href={paths.public.build}
                size="large"
                variant="contained"
                startIcon={<Iconify icon="solar:pen-bold" width={20} />}
              >
                {t('hero.primaryCta')}
              </Button>
              <Button
                component={RouterLink}
                href={paths.public.build}
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="solar:play-broken" width={20} />}
              >
                {t('hero.secondaryCta')}
              </Button>
            </Stack>
          </m.div>
        </Stack>

        {/* Visual mock — stacked preview cards */}
        <m.div variants={varFade('inUp')} style={{ marginTop: 64 }}>
          <LandingHeroVisual />
        </m.div>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function LandingHeroVisual() {
  const { t } = useTranslate('landing');

  const cards = [
    {
      label: t('hero.visual.card1'),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: 'solar:monitor-bold' as const,
      offset: -36,
      zIndex: 1,
    },
    {
      label: t('hero.visual.card2'),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: 'solar:user-rounded-bold' as const,
      offset: 0,
      zIndex: 3,
    },
    {
      label: t('hero.visual.card3'),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: 'solar:chat-round-dots-bold' as const,
      offset: 36,
      zIndex: 1,
    },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { xs: 220, md: 320 },
        perspective: 1200,
      }}
    >
      {cards.map((card) => (
        <Box
          key={card.label}
          sx={{
            position: 'absolute',
            width: { xs: 200, md: 280 },
            height: { xs: 140, md: 180 },
            borderRadius: 3,
            transform: `translateX(${card.offset}%) rotate(${card.offset / 12}deg)`,
            background: card.gradient,
            zIndex: card.zIndex,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: (theme) => theme.shadows[16],
            '&:hover': {
              transform: `translateX(${card.offset}%) rotate(0deg) scale(1.03)`,
              transition: 'transform 0.3s ease',
            },
          }}
        >
          <Stack spacing={1} sx={{ alignItems: 'center', color: '#fff' }}>
            <Iconify icon={card.icon} width={36} />
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
              {card.label}
            </Typography>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
