import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/shared/ui/iconify';

import { findNode } from '../../store/editor-context';
import { defaultPropsByType } from '../../data/editor';
import { editorPaletteItems } from '../../types/editor';
import { useEditor } from '../../store/editor-provider';

// ----------------------------------------------------------------------

export function EditorPalette() {
  const { t } = useTranslate('editor');
  const { addComponent, addChildComponent, components, selectedId } = useEditor();

  const handleClick = (type: (typeof editorPaletteItems)[number]['type']) => {
    const selected = selectedId ? findNode(components, selectedId) : null;

    // Jika komponen terpilih adalah CONTAINER (atau child di dalam container),
    // tambahkan elemen baru sebagai CHILD dari container tsb — ala Carrd.
    if (selected?.type === 'container') {
      addChildComponent(selected.id, type, defaultPropsByType[type]);
      return;
    }

    addComponent(type, defaultPropsByType[type]);
  };

  return (
    <Box component="nav" aria-label={t('palette.title')} sx={{ width: 1 }}>
      <Typography
        variant="overline"
        sx={{ color: 'text.secondary', px: 2, py: 1, display: 'block' }}
      >
        {t('palette.title')}
      </Typography>

      <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 1 }}>
        {editorPaletteItems.map((item) => (
          <ListItem key={item.type} disablePadding sx={{ display: 'list-item' }}>
            <ListItemButton
              onClick={() => handleClick(item.type)}
              sx={{
                gap: 1.5,
                borderRadius: 1.5,
                px: 1.5,
                py: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Iconify icon={item.icon} width={20} sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {t(item.labelKey)}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
    </Box>
  );
}
