import type { PageSettings, ComponentNode } from '../../../types/editor';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { DEVICE_WIDTHS } from '../editor-canvas';
import { CanvasContent } from '../../../renderer/canvas-content';
import { pageFullBackgroundStyle } from '../../../lib/page-style';

// ----------------------------------------------------------------------

type PreviewModeProps = {
  components: ComponentNode[];
  page: PageSettings;
  onExit: () => void;
};

/** Mode preview — hasil halaman bersih tanpa toolbar editor. */
export function PreviewMode({ components, page, onExit }: PreviewModeProps) {
  const { t } = useTranslate('editor');
  const deviceWidth = DEVICE_WIDTHS[page.device] ?? '100%';

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* Kontrol kecil untuk kembali ke editor */}
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {t('preview.header')}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<Iconify icon="solar:pen-bold" width={16} />}
          onClick={onExit}
        >
          {t('preview.exit')}
        </Button>
      </Box>

      {/* Area pratinjau: background fullscreen fixed di belakang, konten di tengah */}
      <Box sx={{ flex: 1, position: 'relative', overflowY: 'auto', p: { xs: 2, md: 4 } }}>
        {/* Lapisan background penuh (fixed, ala Carrd) */}
        <Box aria-hidden sx={{ ...pageFullBackgroundStyle(page, page.bgFixed !== false) }} />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: deviceWidth,
            mx: 'auto',
            minHeight: '70vh',
            p: `${page.padding}px`,
            bgcolor: 'transparent',
            border: `${page.borderWidth}px solid ${page.borderColor}`,
            boxShadow: (theme) => theme.shadows[4],
            borderRadius: 1,
          }}
        >
          {components.length > 0 ? (
            <CanvasContent components={components} selectedId={null} interactive={false} />
          ) : (
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.disabled' }}>
              <Typography variant="body2">{t('preview.empty')}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
