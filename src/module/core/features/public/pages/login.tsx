import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/shared/config';

import { LoginView } from '../views/login-view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('public');

  return (
    <>
      <title>{`${t('login.title')} | ${CONFIG.appName}`}</title>

      <LoginView />
    </>
  );
}
