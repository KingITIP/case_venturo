import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';

import { EditorTopbar } from '../components/editor/editor-topbar';
import { EditorCanvas } from '../components/editor/editor-canvas';
import { EditorSidebar, EditorMobileDrawers } from '../components/editor/editor-sidebar';

// ----------------------------------------------------------------------

type EditorViewProps = {
  siteId?: string;
};

export function EditorView({ siteId }: EditorViewProps) {
  const paletteOpen = useBoolean();
  const propertiesOpen = useBoolean();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <EditorTopbar
        siteId={siteId}
        onTogglePalette={paletteOpen.onToggle}
        onToggleProperties={propertiesOpen.onToggle}
      />

      <Box sx={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <EditorSidebar side="left" />
        <EditorCanvas />
        <EditorSidebar side="right" />
        <EditorMobileDrawers
          paletteOpen={paletteOpen.value}
          propertiesOpen={propertiesOpen.value}
          onClosePalette={paletteOpen.onFalse}
          onCloseProperties={propertiesOpen.onFalse}
        />
      </Box>
    </Box>
  );
}
