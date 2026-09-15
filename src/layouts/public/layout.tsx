import type { Breakpoint } from '@mui/material/styles';
import type { MainSectionProps, HeaderSectionProps, LayoutSectionProps } from '../core';

import { merge } from 'es-toolkit';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { BrandLogo } from 'src/shared/ui/logo';

import { MainSection, LayoutSection, HeaderSection } from '../core';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type PublicLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

export function PublicLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: PublicLayoutProps) {
  const { t } = useTranslate('public');

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: { maxWidth: 'lg' },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      // BrandLogo sudah render <a> (RouterLink ke '/') — jangan bungkus dengan <Link>/<a> lain
      // (nested <a> = hydration error).
      leftArea: <BrandLogo href={paths.public.landing} />,
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <Link
            component={RouterLink}
            href={paths.public.build}
            color="inherit"
            underline="none"
            sx={{ typography: 'subtitle2' }}
          >
            {t('nav.build')}
          </Link>

          <Button
            component={RouterLink}
            href={paths.public.login}
            variant="contained"
            color="primary"
            size="small"
          >
            {t('nav.login')}
          </Button>
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => (
    <Box component="footer" sx={{ borderTop: '1px dashed', borderColor: 'divider', py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center' }}>
          <BrandLogo />

          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              component={RouterLink}
              href={paths.public.landing}
              color="inherit"
              underline="none"
              sx={{ typography: 'subtitle2' }}
            >
              {t('nav.home')}
            </Link>
            <Link
              component={RouterLink}
              href={paths.public.build}
              color="inherit"
              underline="none"
              sx={{ typography: 'subtitle2' }}
            >
              {t('nav.build')}
            </Link>
            <Link
              component={RouterLink}
              href={paths.public.login}
              color="inherit"
              underline="none"
              sx={{ typography: 'subtitle2' }}
            >
              {t('nav.login')}
            </Link>
          </Stack>

          <Divider sx={{ width: 1 }} />

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection headerSection={renderHeader()} footerSection={renderFooter()} sx={sx}>
      {renderMain()}
    </LayoutSection>
  );
}
