import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/shared/config';

import { LandingView } from '../views/landing-view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('public');

  return (
    <>
      <title>{`${t('landing.title')} | ${CONFIG.appName}`}</title>

      <LandingView />
    </>
  );
}
