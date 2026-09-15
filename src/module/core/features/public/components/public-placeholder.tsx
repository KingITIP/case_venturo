import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Label } from 'src/shared/ui/label';

// ----------------------------------------------------------------------

type PublicPlaceholderProps = {
  title: string;
  badge?: string;
  description?: string;
  children?: ReactNode;
};

export function PublicPlaceholder({ title, badge, description, children }: PublicPlaceholderProps) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ textAlign: 'center', minHeight: '50vh', justifyContent: 'center' }}
      >
        <Label color="primary" variant="soft">
          {badge ?? 'Coming Soon'}
        </Label>

        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>

        {description && (
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 480 }}>
            {description}
          </Typography>
        )}

        {children}
      </Stack>
    </Container>
  );
}
