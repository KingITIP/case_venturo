import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { EditorPalette } from './editor-palette';
import { EditorPropertyPanel } from './editor-property-panel';

// ----------------------------------------------------------------------

type EditorSidebarProps = {
  side?: 'left' | 'right';
};

export function EditorSidebar({ side = 'left' }: EditorSidebarProps) {
  return (
    <Box
      component={side === 'left' ? 'nav' : 'aside'}
      aria-label={side === 'left' ? 'Elements' : 'Properties'}
      sx={{
        display: { xs: 'none', md: 'block' },
        width: side === 'left' ? 240 : 300,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: side === 'left' ? (theme) => `1px solid ${theme.palette.divider}` : 'none',
        borderLeft: side === 'right' ? (theme) => `1px solid ${theme.palette.divider}` : 'none',
        overflowY: 'auto',
      }}
    >
      {side === 'left' ? <EditorPalette /> : <EditorPropertyPanel />}
    </Box>
  );
}

// ----------------------------------------------------------------------

type EditorMobileDrawersProps = {
  paletteOpen: boolean;
  propertiesOpen: boolean;
  onClosePalette: () => void;
  onCloseProperties: () => void;
};

export function EditorMobileDrawers({
  paletteOpen,
  propertiesOpen,
  onClosePalette,
  onCloseProperties,
}: EditorMobileDrawersProps) {
  return (
    <>
      <Drawer
        anchor="left"
        open={paletteOpen}
        onClose={onClosePalette}
        sx={{ display: { md: 'none' } }}
      >
        <Box sx={{ width: 260, pt: 2 }}>
          <EditorPalette />
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={propertiesOpen}
        onClose={onCloseProperties}
        sx={{ display: { md: 'none' } }}
      >
        <Box sx={{ width: 300, pt: 2 }}>
          <EditorPropertyPanel />
        </Box>
      </Drawer>
    </>
  );
}
