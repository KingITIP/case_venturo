import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { useEditorState } from '../../store/editor-provider';
import { CanvasContent } from '../../renderer/canvas-content';

// ----------------------------------------------------------------------

export function EditorCanvas() {
  const { t } = useTranslate('editor');
  const { components, selectedId } = useEditorState();

  return (
    <Box
      component="main"
      aria-label={t('canvas.pageLabel')}
      sx={{
        flex: '1 1 auto',
        minWidth: 0,
        height: '100%',
        overflowY: 'auto',
        bgcolor: 'background.neutral',
        backgroundImage: 'radial-gradient(circle, rgba(120,120,120,0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        p: { xs: 2, md: 4 },
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          maxWidth: 720,
          mx: 'auto',
          minHeight: '70vh',
          p: { xs: 3, md: 6 },
          boxShadow: (theme) => theme.shadows[8],
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {components.length > 0 ? (
          <CanvasContent components={components} selectedId={selectedId} />
        ) : (
          <EmptyCanvas />
        )}
      </Paper>
    </Box>
  );
}

// ----------------------------------------------------------------------

function EmptyCanvas() {
  const { t } = useTranslate('editor');

  return (
    <Box
      sx={{
        border: (theme) => `1.5px dashed ${theme.palette.divider}`,
        borderRadius: 2,
        p: 4,
        textAlign: 'center',
      }}
    >
      <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
        <Iconify icon="solar:pen-bold" width={36} sx={{ color: 'text.disabled' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('canvas.emptyTitle')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
          {t('canvas.emptyDescription')}
        </Typography>
      </Stack>
    </Box>
  );
}
