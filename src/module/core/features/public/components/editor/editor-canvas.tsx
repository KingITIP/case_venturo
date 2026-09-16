import type { DeviceSize } from '../../types/editor';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { CanvasContent } from '../../renderer/canvas-content';
import { pageFullBackgroundStyle } from '../../lib/page-style';
import { useEditorShortcuts } from '../../hooks/use-editor-shortcuts';
import { useEditor, useEditorState } from '../../store/editor-provider';

// ----------------------------------------------------------------------

/** Lebar konten per perangkat — mobile < tablet < desktop, auto = 100% */
export const DEVICE_WIDTHS: Record<DeviceSize, string | number> = {
  mobile: 390,
  tablet: 768,
  desktop: 1024,
  auto: '100%',
};

export function EditorCanvas() {
  const { t } = useTranslate('editor');
  const { components, selectedId, page } = useEditorState();
  const { clearSelection, select, removeComponent, duplicateComponent, moveComponentTo } =
    useEditor();

  useEditorShortcuts({
    selectedId,
    onRemove: removeComponent,
    onDuplicate: duplicateComponent,
    onClear: clearSelection,
  });

  const isPageSelected = selectedId === 'page';
  const deviceWidth = DEVICE_WIDTHS[page.device] ?? '100%';
  const isBgFixed = page.bgFixed !== false;

  // Klik area kosong = pilih halaman (bukan clear). Klik di luar paper (scroll area) = clear.
  const handlePaperClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    select('page');
  };

  return (
    <Box
      component="main"
      aria-label={t('canvas.pageLabel')}
      onClick={clearSelection}
      sx={{
        flex: '1 1 auto',
        minWidth: 0,
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
        bgcolor: 'background.neutral',
        backgroundImage: 'radial-gradient(circle, rgba(120,120,120,0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Lapisan background penuh — gambar/warna/gradient halaman, FIXED di belakang */}
      <Box aria-hidden sx={{ ...pageFullBackgroundStyle(page, isBgFixed) }} />

      {/* Konten halaman — Paper di tengah, di atas background */}
      <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 2, md: 4 } }}>
        <Paper
          variant="outlined"
          onClick={handlePaperClick}
          sx={{
            maxWidth: deviceWidth,
            mx: 'auto',
            minHeight: '70vh',
            p: `${page.padding}px`,
            bgcolor: 'transparent',
            border: `${page.borderWidth}px solid ${page.borderColor}`,
            boxShadow: (theme) => theme.shadows[8],
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'relative',
            ...(isPageSelected
              ? {
                  outline: '2px solid #00a76f',
                  outlineOffset: 2,
                  cursor: 'pointer',
                }
              : {}),
          }}
        >
          {components.length > 0 ? (
            <CanvasContent
              components={components}
              selectedId={selectedId}
              interactive
              onReorder={(id, toIndex) => moveComponentTo(id, toIndex)}
            />
          ) : (
            <EmptyCanvas />
          )}
        </Paper>
      </Box>
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
