import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/shared/config';

import { LoginView } from '../views/login-view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('auth-public');

  return (
    <>
      <title>{`${t('meta.title')} | ${CONFIG.appName}`}</title>

      <LoginView />
    </>
  );
}
