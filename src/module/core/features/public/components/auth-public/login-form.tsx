import type { TFunction } from 'i18next';

import * as z from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { toast } from 'src/shared/ui/snackbar';
import { Iconify } from 'src/shared/ui/iconify';
import { Form, Field } from 'src/shared/ui/hook-form';

// ----------------------------------------------------------------------

export type LoginSchemaType = {
  email: string;
  password: string;
};

function makeSchema(t: TFunction) {
  return z.object({
    email: z
      .string()
      .min(1, { message: t('validation.emailRequired') })
      .email({ message: t('validation.emailInvalid') }),
    password: z
      .string()
      .min(1, { message: t('validation.passwordRequired') })
      .min(8, { message: t('validation.passwordMin') }),
  });
}

// ----------------------------------------------------------------------

const MOCK_DELAY_MS = 1200;

/** Deterministic mock: email mengandung "+ok" → sukses, selainnya gagal. */
function mockSignIn(email: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(email.includes('+ok')), MOCK_DELAY_MS);
  });
}

export function LoginForm() {
  const router = useRouter();
  const showPassword = useBoolean();
  const { t } = useTranslate('auth-public');

  const schema = useMemo(() => makeSchema(t), [t]);

  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const ok = await mockSignIn(data.email);

    if (ok) {
      toast.success(t('feedback.success'));
      router.push(paths.public.build);
    } else {
      toast.error(t('feedback.error'));
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Field.Text
        name="email"
        type="email"
        label={t('signIn.fields.email')}
        placeholder={t('signIn.fields.emailPlaceholder')}
        slotProps={{ inputLabel: { shrink: true }, htmlInput: { autoComplete: 'email' } }}
      />

      <Field.Text
        name="password"
        label={t('signIn.fields.password')}
        placeholder={t('signIn.fields.passwordPlaceholder')}
        type={showPassword.value ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { autoComplete: 'current-password' },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={showPassword.onToggle}
                  edge="end"
                  aria-label={t('signIn.fields.password')}
                >
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={t('signIn.submitting')}
      >
        {t('signIn.submit')}
      </Button>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      {renderForm()}
    </Form>
  );
}
