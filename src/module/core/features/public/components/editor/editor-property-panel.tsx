import type { ComponentNode } from '../../types/editor';
import type { IconifyName } from 'src/shared/ui/iconify/register-icons';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { editorPaletteItems } from '../../types/editor';
import { useEditor } from '../../store/editor-provider';
import { PropertyFields } from './property-panel/property-fields';

// ----------------------------------------------------------------------

export function EditorPropertyPanel() {
  const { t } = useTranslate('editor');
  const { components, selectedId } = useEditor();

  const selected = components.find((c) => c.id === selectedId) ?? null;
  const definition = selected ? editorPaletteItems.find((d) => d.type === selected.type) : null;

  return (
    <Box
      component="aside"
      aria-label={t('properties.title')}
      sx={{ width: 1, height: '100%', overflowY: 'auto' }}
    >
      <Typography
        variant="overline"
        sx={{ color: 'text.secondary', px: 2, py: 1, display: 'block' }}
      >
        {t('properties.title')}
      </Typography>

      {selected && definition ? (
        <SelectedPanel
          definitionLabel={t(definition.labelKey)}
          icon={definition.icon}
          node={selected}
        />
      ) : (
        <EmptyState />
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function EmptyState() {
  const { t } = useTranslate('editor');

  return (
    <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', px: 3, py: 8 }}>
      <Iconify icon="solar:settings-bold" width={32} sx={{ color: 'text.disabled' }} />
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {t('properties.emptyTitle')}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {t('properties.emptyDescription')}
      </Typography>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function SelectedPanel({
  definitionLabel,
  icon,
  node,
}: {
  definitionLabel: string;
  icon: IconifyName;
  node: ComponentNode;
}) {
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Iconify icon={icon} width={20} sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {definitionLabel}
          </Typography>
        </Stack>

        <Chip
          size="small"
          label={node.id}
          variant="outlined"
          sx={{ alignSelf: 'flex-start', fontFamily: 'monospace' }}
        />

        <PropertyFields node={node} />
      </Stack>
    </Box>
  );
}
