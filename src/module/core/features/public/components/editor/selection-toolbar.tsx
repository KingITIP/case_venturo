import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

// ----------------------------------------------------------------------

type SelectionToolbarProps = {
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
};

/** Toolbar mini mengambang di atas komponen terpilih (ala Carrd). */
export function SelectionToolbar({
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onRemove,
}: SelectionToolbarProps) {
  const { t } = useTranslate('editor');

  return (
    <Box
      sx={{
        position: 'absolute',
        top: -38,
        right: 0,
        zIndex: 20,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.25,
        px: 0.5,
        bgcolor: 'background.paper',
        borderRadius: 1.5,
        boxShadow: (theme) => theme.shadows[6],
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Tooltip title={t('actions.moveUp')}>
        <span>
          <IconButton
            size="small"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            aria-label={t('actions.moveUp')}
          >
            <Iconify icon="solar:double-alt-arrow-up-bold-duotone" width={18} />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title={t('actions.moveDown')}>
        <span>
          <IconButton
            size="small"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            aria-label={t('actions.moveDown')}
          >
            <Iconify icon="solar:double-alt-arrow-down-bold-duotone" width={18} />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title={t('actions.duplicate')}>
        <IconButton size="small" onClick={onDuplicate} aria-label={t('actions.duplicate')}>
          <Iconify icon="solar:copy-bold" width={18} />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('actions.remove')}>
        <IconButton
          size="small"
          onClick={onRemove}
          aria-label={t('actions.remove')}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" width={18} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
