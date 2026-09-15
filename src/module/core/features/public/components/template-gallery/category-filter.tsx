import type { TemplateCategory } from '../../data/build';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { useTranslate } from 'src/locales';

import { templateCategories } from '../../data/build';

// ----------------------------------------------------------------------

type CategoryFilterProps = {
  active: TemplateCategory | 'all';
  onChange: (category: TemplateCategory | 'all') => void;
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const { t } = useTranslate('build');

  return (
    <Box
      component="nav"
      aria-label={t('categories.all')}
      sx={{
        display: 'flex',
        gap: 1,
        flexWrap: { xs: 'nowrap', sm: 'wrap' },
        overflowX: { xs: 'auto', sm: 'visible' },
        pb: 1,
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {templateCategories.map((category) => {
        const isActive = active === category.value;

        return (
          <Chip
            key={category.value}
            label={t(category.labelKey)}
            onClick={() => onChange(category.value)}
            color={isActive ? 'primary' : 'default'}
            variant={isActive ? 'filled' : 'outlined'}
            sx={{ flexShrink: 0, fontWeight: 600 }}
            role="tab"
            aria-selected={isActive}
          />
        );
      })}
    </Box>
  );
}
