import type { DeviceSize } from '../../types/editor';
import type { IconifyName } from 'src/shared/ui/iconify/register-icons';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

// ----------------------------------------------------------------------

/** Kontrol ukuran perangkat (hp/tablet/desktop/auto) — ala Carrd. */
function DeviceToggle({
  value,
  onChange,
}: {
  value: DeviceSize;
  onChange: (device: DeviceSize) => void;
}) {
  const { t } = useTranslate('editor');

  const devices: { id: DeviceSize; icon: IconifyName; label: string }[] = [
    { id: 'mobile', icon: 'solar:smartphone-2-bold', label: t('device.mobile') },
    { id: 'tablet', icon: 'solar:phone-bold', label: t('device.tablet') },
    { id: 'desktop', icon: 'solar:monitor-bold', label: t('device.desktop') },
    { id: 'auto', icon: 'solar:full-screen-square-outline', label: t('device.auto') },
  ];

  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={value}
      onChange={(_, next) => next && onChange(next as DeviceSize)}
      aria-label={t('device.label')}
    >
      {devices.map((d) => (
        <ToggleButton key={d.id} value={d.id} aria-label={d.label} title={d.label}>
          <Iconify icon={d.icon} width={16} />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

type EditorTopbarProps = {
  siteId?: string;
  mode: 'edit' | 'preview';
  saving: boolean;
  saved: boolean;
  device: DeviceSize;
  onChangeDevice: (device: DeviceSize) => void;
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
  device,
  onChangeDevice,
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

      {/* Center: device toggle (hidden on small screens — pakai switch di sidebar?) */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        <DeviceToggle value={device} onChange={onChangeDevice} />
      </Box>

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
