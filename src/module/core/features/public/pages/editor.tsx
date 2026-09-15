import { useParams } from 'react-router';

import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/shared/config';

import { EditorView } from '../views/editor-view';
import { EditorProvider } from '../store/editor-provider';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('editor');
  const { id } = useParams();

  return (
    <>
      <title>{`${t('meta.title')}${id ? ` #${id}` : ''} | ${CONFIG.appName}`}</title>

      <EditorProvider siteId={id}>
        <EditorView siteId={id} />
      </EditorProvider>
    </>
  );
}
