import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/shared/config';

import { LandingView } from '../views/landing-view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('landing');

  return (
    <>
      <title>{`${t('meta.title')} | ${CONFIG.appName}`}</title>

      <LandingView />
    </>
  );
}
