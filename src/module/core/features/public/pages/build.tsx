import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/shared/config';

import { BuildView } from '../views/build-view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('build');

  return (
    <>
      <title>{`${t('meta.title')} | ${CONFIG.appName}`}</title>

      <BuildView />
    </>
  );
}
