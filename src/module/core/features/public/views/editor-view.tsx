import { useTranslate } from 'src/locales';

import { PublicPlaceholder } from '../components/public-placeholder';

// ----------------------------------------------------------------------

export function EditorView() {
  const { t } = useTranslate('public');

  return (
    <PublicPlaceholder
      title={t('editor.title')}
      badge={t('editor.badge')}
      description={t('editor.description')}
    />
  );
}
