import type { DeviceSize } from '../../types/editor';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { CanvasContent } from '../../renderer/canvas-content';
import { useEditorShortcuts } from '../../hooks/use-editor-shortcuts';
import { useEditor, useEditorState } from '../../store/editor-provider';
import { pageBackgroundStyle, pageFullBackgroundStyle } from '../../lib/page-style';

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

  const pageBg = pageBackgroundStyle(page);

  // Klik area kosong / background = pilih halaman (bukan clear). Komponen
  // di dalam page berhenti propagasi sendiri (stopPropagation di frame).
  // Konsisten dengan Carrd: background adalah bagian dari page.
  const handleCanvasClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const isBgLayer = target.getAttribute?.('data-bg-layer') === 'true';
    if (isBgLayer) {
      event.stopPropagation();
    }
    select('page');
  };

  const handlePaperClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    select('page');
  };

  return (
    <Box
      component="main"
      aria-label={t('canvas.pageLabel')}
      onClick={handleCanvasClick}
      sx={{
        flex: '1 1 auto',
        minWidth: 0,
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
        // Membuat <main> menjadi containing block utk position:fixed anak
        // (bg layer & scrim) — sehingga lebar/tinggi mereka = area main saja,
        // TIDAK menutupi sidebar kiri/kanan (property panel).
        transform: 'translateZ(0)',
        // Workspace gelap ala builder (Carrd/Craft): menu & page kontras jelas.
        bgcolor: '#16181d',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      {/* Lapisan background penuh — image/gradient/fade halaman, FIXED di belakang.
          Ini "background" yang diedit via Page Settings (kunci: data-bg-layer). */}
      <Box
        aria-hidden="true"
        data-bg-layer="true"
        sx={{ ...pageFullBackgroundStyle(page, isBgFixed) }}
      />

      {/* Scrim workspace — menggelapkan area di LUAR page, menjaga editor tetap
          terbaca meski bg layer terang/putih. Tidak menghalangi klik (pointer-events none).
          width/height 100% (bukan 100vw) karena main adalah containing block — jadi
          hanya menutupi area canvas, TIDAK sidebar kiri/kanan. */}
      <Box
        aria-hidden="true"
        sx={{
          position: isBgFixed ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          bgcolor: 'rgba(10, 12, 16, 0.62)',
        }}
      />

      {/* Konten halaman — Paper "kertas" di tengah, WYSIWYG dengan page settings */}
      <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 2, md: 4 } }}>
        <Paper
          variant="outlined"
          onClick={handlePaperClick}
          sx={{
            maxWidth: deviceWidth,
            mx: 'auto',
            minHeight: '70vh',
            p: `${page.padding}px`,
            // Kertas = warna latar halaman (default putih). Gradient/image juga
            // dirender di dalam page agar WYSIWYG dengan bg fullscreen.
            bgcolor: pageBg.backgroundColor,
            backgroundImage: pageBg.backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
