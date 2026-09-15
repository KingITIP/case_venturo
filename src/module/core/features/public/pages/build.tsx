import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/shared/config';

import { BuildView } from '../views/build-view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('public');

  return (
    <>
      <title>{`${t('build.title')} | ${CONFIG.appName}`}</title>

      <BuildView />
    </>
  );
}
