import type { TemplateCategory } from '../data/build';

import { m } from 'framer-motion';
import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';
import { varFade, MotionViewport } from 'src/shared/ui/animate';

import { templateItems } from '../data/build';
import { BlankCard } from '../components/template-gallery/blank-card';
import { TemplateCard } from '../components/template-gallery/template-card';
import { CategoryFilter } from '../components/template-gallery/category-filter';

// ----------------------------------------------------------------------

export function BuildView() {
  const { t } = useTranslate('build');

  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');

  const filteredTemplates = useMemo(
    () =>
      activeCategory === 'all'
        ? templateItems
        : templateItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={2} sx={{ textAlign: 'center', alignItems: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ fontWeight: 800, letterSpacing: -1 }}>
          {t('heading.title')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 560 }}>
          {t('heading.subtitle')}
        </Typography>
      </Stack>

      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      <Box
        component={MotionViewport}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
          mt: 4,
        }}
      >
        {/* Blank page card — always first, always visible */}
        <m.div variants={varFade('inUp')} style={{ height: '100%' }}>
          <BlankCard />
        </m.div>

        {filteredTemplates.map((template) => (
          <m.div key={template.id} variants={varFade('inUp')} style={{ height: '100%' }}>
            <TemplateCard template={template} />
          </m.div>
        ))}
      </Box>

      {filteredTemplates.length === 0 && (
        <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', py: 8 }}>
          <Iconify icon="solar:box-minimalistic-bold" width={48} sx={{ color: 'text.disabled' }} />
          <Typography variant="h6">{t('empty.title')}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('empty.description')}
          </Typography>
        </Stack>
      )}
    </Container>
  );
}
