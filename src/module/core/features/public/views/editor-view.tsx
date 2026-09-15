import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';

import { useTranslate } from 'src/locales';
import { toast } from 'src/shared/ui/snackbar';

import { useEditor } from '../store/editor-provider';
import { saveSiteToStorage } from '../lib/editor-storage';
import { EditorTopbar } from '../components/editor/editor-topbar';
import { EditorCanvas } from '../components/editor/editor-canvas';
import { PreviewMode } from '../components/editor/preview/preview-mode';
import { EditorSidebar, EditorMobileDrawers } from '../components/editor/editor-sidebar';

// ----------------------------------------------------------------------

type EditorViewProps = {
  siteId?: string;
};

export function EditorView({ siteId }: EditorViewProps) {
  const { t } = useTranslate('editor');
  const paletteOpen = useBoolean();
  const propertiesOpen = useBoolean();
  const { components, mode, page, setMode, updatePage } = useEditor();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleTogglePreview = useCallback(() => {
    setMode(mode === 'preview' ? 'edit' : 'preview');
  }, [mode, setMode]);

  const handleSave = useCallback(() => {
    if (!siteId) {
      toast.error(t('message.saveError'));
      return;
    }
    setSaving(true);
    // Simulasi proses singkat
    setTimeout(() => {
      try {
        saveSiteToStorage(siteId, components, page);
        setSaving(false);
        setSaved(true);
        toast.success(t('message.saveSuccess'));
        setTimeout(() => setSaved(false), 2000);
      } catch {
        setSaving(false);
        toast.error(t('message.saveError'));
      }
    }, 400);
  }, [siteId, components, t, page]);

  // Mode preview: render bersih, tanpa toolbar editor
  if (mode === 'preview') {
    return <PreviewMode components={components} page={page} onExit={() => setMode('edit')} />;
  }

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
        mode={mode}
        saving={saving}
        saved={saved}
        device={page.device}
        onChangeDevice={(device) => updatePage({ device })}
        onTogglePreview={handleTogglePreview}
        onSave={handleSave}
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
