import { useParams } from 'react-router';

import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/shared/config';

import { EditorView } from '../views/editor-view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('public');
  const { id } = useParams();

  return (
    <>
      <title>{`${t('editor.title')}${id ? ` #${id}` : ''} | ${CONFIG.appName}`}</title>

      <EditorView />
    </>
  );
}
