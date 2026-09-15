import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

// ----------------------------------------------------------------------

type EditorTopbarProps = {
  siteId?: string;
  mode: 'edit' | 'preview';
  saving: boolean;
  saved: boolean;
  onTogglePreview: () => void;
  onSave: () => void;
  onTogglePalette: () => void;
  onToggleProperties: () => void;
};

export function EditorTopbar({
  siteId,
  mode,
  saving,
  saved,
  onTogglePreview,
  onSave,
  onTogglePalette,
  onToggleProperties,
}: EditorTopbarProps) {
  const { t } = useTranslate('editor');

  const saveLabel = saved ? t('topbar.saved') : t('topbar.save');

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        px: 2,
        gap: 1,
        bgcolor: 'background.paper',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Left: back + site identity */}
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: 1, minWidth: 0 }}>
        <Tooltip title={t('topbar.back')}>
          <IconButton
            component={RouterLink}
            href={paths.public.build}
            edge="start"
            aria-label={t('topbar.back')}
          >
            <Iconify icon="eva:arrow-ios-back-fill" width={22} />
          </IconButton>
        </Tooltip>

        <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
          {t('topbar.siteName')}
          {siteId ? ` · ${siteId}` : ''}
        </Typography>
      </Stack>

      {/* Mobile: toggle palette */}
      <IconButton
        onClick={onTogglePalette}
        aria-label={t('topbar.togglePalette')}
        sx={{ display: { md: 'none' } }}
      >
        <Iconify icon="carbon:menu" width={22} />
      </IconButton>

      {/* Right: actions */}
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Tooltip title={t('topbar.undo')}>
          <span>
            <IconButton disabled aria-label={t('topbar.undo')}>
              <Iconify icon="solar:restart-bold" width={20} sx={{ transform: 'scaleX(-1)' }} />
            </IconButton>
          </span>
        </Tooltip>

        <Button
          size="small"
          variant={mode === 'preview' ? 'contained' : 'outlined'}
          startIcon={<Iconify icon="solar:eye-bold" width={18} />}
          onClick={onTogglePreview}
        >
          {mode === 'preview' ? t('topbar.exitPreview') : t('topbar.preview')}
        </Button>

        <Button
          size="small"
          variant="contained"
          color={saved ? 'success' : 'primary'}
          startIcon={saved ? <Iconify icon="solar:check-circle-bold" width={18} /> : undefined}
          loading={saving}
          loadingIndicator={t('topbar.saving')}
          onClick={onSave}
        >
          {saveLabel}
        </Button>

        {/* Mobile: toggle properties */}
        <IconButton
          onClick={onToggleProperties}
          aria-label={t('topbar.toggleProperties')}
          sx={{ display: { md: 'none' } }}
        >
          <Iconify icon="solar:settings-bold" width={22} />
        </IconButton>
      </Stack>
    </Box>
  );
}
