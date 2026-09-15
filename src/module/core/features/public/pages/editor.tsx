import { useParams } from 'react-router';

import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/shared/config';

import { EditorView } from '../views/editor-view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('editor');
  const { id } = useParams();

  return (
    <>
      <title>{`${t('meta.title')}${id ? ` #${id}` : ''} | ${CONFIG.appName}`}</title>

      <EditorView siteId={id} />
    </>
  );
}
