import { useTranslate } from 'src/locales';

import { PublicPlaceholder } from '../components/public-placeholder';

// ----------------------------------------------------------------------

export function LoginView() {
  const { t } = useTranslate('public');

  return (
    <PublicPlaceholder
      title={t('login.title')}
      badge={t('login.badge')}
      description={t('login.description')}
    />
  );
}
