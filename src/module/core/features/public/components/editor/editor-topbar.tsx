import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { toast } from 'src/shared/ui/snackbar';
import { Iconify } from 'src/shared/ui/iconify';

// ----------------------------------------------------------------------

type EditorTopbarProps = {
  siteId?: string;
  onTogglePalette: () => void;
  onToggleProperties: () => void;
};

export function EditorTopbar({ siteId, onTogglePalette, onToggleProperties }: EditorTopbarProps) {
  const { t } = useTranslate('editor');

  const handleComingSoon = () => {
    toast.info(t('topbar.comingSoon'));
  };

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
          variant="outlined"
          startIcon={<Iconify icon="solar:eye-bold" width={18} />}
          onClick={handleComingSoon}
        >
          {t('topbar.preview')}
        </Button>

        <Button
          size="small"
          variant="contained"
          startIcon={<Iconify icon="solar:check-circle-bold" width={18} />}
          onClick={handleComingSoon}
        >
          {t('topbar.save')}
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
