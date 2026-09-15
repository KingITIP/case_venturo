import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Label } from 'src/shared/ui/label';

// ----------------------------------------------------------------------

type LandingSectionHeadingProps = {
  badge?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
};

export function LandingSectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
}: LandingSectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: isCenter ? 'center' : 'flex-start',
        maxWidth: 640,
        mx: isCenter ? 'auto' : 0,
        textAlign: isCenter ? 'center' : 'left',
      }}
    >
      {badge && <Label color="primary">{badge}</Label>}

      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>

      {subtitle && (
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}
