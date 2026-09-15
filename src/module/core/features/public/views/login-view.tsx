import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { BrandLogo } from 'src/shared/ui/logo';

import { LoginForm } from '../components/auth-public/login-form';

// ----------------------------------------------------------------------

export function LoginView() {
  const { t } = useTranslate('auth-public');

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack
        spacing={3}
        sx={{
          width: '100%',
          maxWidth: 420,
          mx: 'auto',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <BrandLogo />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t('signIn.title')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('signIn.subtitle')}
          </Typography>
        </Box>

        <Box sx={{ width: 1, textAlign: 'left' }}>
          <LoginForm />
        </Box>

        <Divider sx={{ width: 1, typography: 'overline', color: 'text.disabled' }} />

        <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
          <Link
            component={RouterLink}
            href="/#"
            variant="subtitle2"
            color="inherit"
            underline="always"
          >
            {t('secondary.forgotPassword')}
          </Link>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('secondary.noAccount')}{' '}
            <Link
              component={RouterLink}
              href={paths.auth.jwt.signUp}
              variant="subtitle2"
              underline="always"
            >
              {t('secondary.signUp')}
            </Link>
          </Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {t('mockNote')}
        </Typography>
      </Stack>
    </Container>
  );
}
