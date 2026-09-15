import type { ReactNode } from 'react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

type ComponentFrameProps = {
  selected: boolean;
  children: ReactNode;
};

/** Wrapper setiap komponen di canvas + penanda seleksi (outline halus). */
export function ComponentFrame({ selected, children }: ComponentFrameProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,
        outline: selected ? '2px solid' : '1px solid transparent',
        outlineColor: selected ? 'primary.main' : 'transparent',
        boxShadow: selected ? (theme) => theme.shadows[4] : 'none',
        transition: 'outline-color 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          outlineColor: (theme) => (selected ? theme.palette.primary.main : theme.palette.divider),
        },
      }}
    >
      {children}
    </Box>
  );
}
