import type { ReactNode } from 'react';

import Box from '@mui/material/Box';

import { SelectionToolbar } from '../components/editor/selection-toolbar';

// ----------------------------------------------------------------------

type ComponentFrameProps = {
  selected: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
  children: ReactNode;
};

/** Wrapper setiap komponen di canvas — klik = seleksi + penanda outline + toolbar mini. */
export function ComponentFrame({
  selected,
  canMoveUp,
  canMoveDown,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onRemove,
  children,
}: ComponentFrameProps) {
  return (
    <Box
      onClick={onSelect}
      sx={{
        position: 'relative',
        borderRadius: 1,
        cursor: 'pointer',
        outline: '1.5px solid transparent',
        outlineColor: selected ? 'primary.main' : 'transparent',
        boxShadow: selected ? (theme) => theme.shadows[4] : 'none',
        transition: 'outline-color 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          outlineColor: (theme) => (selected ? theme.palette.primary.main : theme.palette.divider),
        },
      }}
    >
      {selected && (
        <SelectionToolbar
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDuplicate={onDuplicate}
          onRemove={onRemove}
        />
      )}

      {children}
    </Box>
  );
}
