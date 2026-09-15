import type { ComponentNode } from '../../types/editor';
import type { IconifyName } from 'src/shared/ui/iconify/register-icons';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { editorPaletteItems } from '../../types/editor';
import { useEditor, useEditorState } from '../../store/editor-provider';

// ----------------------------------------------------------------------

export function EditorPropertyPanel() {
  const { t } = useTranslate('editor');
  const { selectedId } = useEditorState();
  const { components } = useEditor();

  const selected = components.find((c) => c.id === selectedId) ?? null;
  const definition = selected ? editorPaletteItems.find((d) => d.type === selected.type) : null;

  return (
    <Box component="aside" aria-label={t('properties.title')} sx={{ width: 1 }}>
      <Typography
        variant="overline"
        sx={{ color: 'text.secondary', px: 2, py: 1, display: 'block' }}
      >
        {t('properties.title')}
      </Typography>

      {selected && definition ? (
        <SelectedSummary
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

function SelectedSummary({
  definitionLabel,
  icon,
  node,
}: {
  definitionLabel: string;
  icon: IconifyName;
  node: ComponentNode;
}) {
  const { t } = useTranslate('editor');
  const { props = {} } = node;

  const primary = (props.text || props.label || String(props.src ?? '') || '').slice(0, 60);

  return (
    <Box sx={{ px: 2 }}>
      <Stack
        spacing={1.5}
        sx={{
          p: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          bgcolor: 'background.neutral',
        }}
      >
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

        {primary ? (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {primary}
          </Typography>
        ) : (
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {t('properties.noContent')}
          </Typography>
        )}

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {t('properties.fullFormComingSoon')}
        </Typography>
      </Stack>
    </Box>
  );
}
