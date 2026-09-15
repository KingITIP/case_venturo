import { useTranslate } from 'src/locales';

import { PublicPlaceholder } from '../components/public-placeholder';

// ----------------------------------------------------------------------

export function BuildView() {
  const { t } = useTranslate('public');

  return (
    <PublicPlaceholder
      title={t('build.title')}
      badge={t('build.badge')}
      description={t('build.description')}
    />
  );
}
