import { useTranslate } from 'src/locales';

import { PublicPlaceholder } from '../components/public-placeholder';

// ----------------------------------------------------------------------

export function LandingView() {
  const { t } = useTranslate('public');

  return (
    <PublicPlaceholder
      title={t('landing.title')}
      badge={t('landing.badge')}
      description={t('landing.description')}
    />
  );
}
