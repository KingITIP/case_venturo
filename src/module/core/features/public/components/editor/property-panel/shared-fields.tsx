import type { ReactNode } from 'react';
import type { ComponentNode } from '../../../types/editor';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { useEditor } from '../../../store/editor-provider';

// ----------------------------------------------------------------------

type FieldProps = {
  node: ComponentNode;
};

const ALIGN_OPTIONS = [
  { value: 'left', key: 'fields.alignLeft' },
  { value: 'center', key: 'fields.alignCenter' },
  { value: 'right', key: 'fields.alignRight' },
] as const;

function AlignSelect({ node }: FieldProps) {
  const { t } = useTranslate('editor');
  const { updateComponentProps } = useEditor();
  const align = node.props?.align ?? 'left';

  return (
    <TextField
      select
      fullWidth
      size="small"
      label={t('fields.align')}
      value={align}
      onChange={(e) =>
        updateComponentProps(node.id, { align: e.target.value as 'left' | 'center' | 'right' })
      }
    >
      {ALIGN_OPTIONS.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {t(opt.key)}
        </MenuItem>
      ))}
    </TextField>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
      {children}
    </Typography>
  );
}

export { AlignSelect, SectionLabel };
