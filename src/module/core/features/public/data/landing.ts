import type { IconifyName } from 'src/shared/ui/iconify/register-icons';

// ----------------------------------------------------------------------

export type LandingDemoItem = {
  id: string;
  icon: IconifyName;
  labelKey: string;
  gradient: string;
};

export type LandingFeatureItem = {
  id: string;
  icon: IconifyName;
  titleKey: string;
  descriptionKey: string;
};

export type LandingPricingFeature = {
  id: string;
  labelKey: string;
};

// ----------------------------------------------------------------------

export const landingDemoItems: LandingDemoItem[] = [
  {
    id: 'landing',
    icon: 'solar:monitor-bold',
    labelKey: 'landing.demo.items.landing',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'profile',
    icon: 'solar:user-rounded-bold',
    labelKey: 'landing.demo.items.profile',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'form',
    icon: 'solar:chat-round-dots-bold',
    labelKey: 'landing.demo.items.form',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'portfolio',
    icon: 'solar:gallery-wide-bold',
    labelKey: 'landing.demo.items.portfolio',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 'showcase',
    icon: 'solar:palette-bold',
    labelKey: 'landing.demo.items.showcase',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 'landingVariant',
    icon: 'solar:pen-bold',
    labelKey: 'landing.demo.items.landingVariant',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
];

// ----------------------------------------------------------------------

export const landingFeatureItems: LandingFeatureItem[] = [
  {
    id: 'simple',
    icon: 'solar:box-minimalistic-bold',
    titleKey: 'landing.features.items.simple.title',
    descriptionKey: 'landing.features.items.simple.description',
  },
  {
    id: 'responsive',
    icon: 'solar:monitor-bold',
    titleKey: 'landing.features.items.responsive.title',
    descriptionKey: 'landing.features.items.responsive.description',
  },
  {
    id: 'free',
    icon: 'solar:heart-bold',
    titleKey: 'landing.features.items.free.title',
    descriptionKey: 'landing.features.items.free.description',
  },
];

// ----------------------------------------------------------------------

export const landingPricingFeatures: LandingPricingFeature[] = [
  { id: 'customDomain', labelKey: 'landing.pricing.features.customDomain' },
  { id: 'moreSites', labelKey: 'landing.pricing.features.moreSites' },
  { id: 'forms', labelKey: 'landing.pricing.features.forms' },
  { id: 'widgets', labelKey: 'landing.pricing.features.widgets' },
  { id: 'analytics', labelKey: 'landing.pricing.features.analytics' },
  { id: 'noBranding', labelKey: 'landing.pricing.features.noBranding' },
];
