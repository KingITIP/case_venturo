import type { IconifyName } from 'src/shared/ui/iconify/register-icons';

// ----------------------------------------------------------------------

export type TemplateCategory = 'profile' | 'landing' | 'form' | 'portfolio' | 'sectioned';

export type TemplateDefinition = {
  blocks: { type: string; props?: Record<string, unknown> }[];
};

export type Template = {
  id: string;
  nameKey: string;
  category: TemplateCategory;
  icon: IconifyName;
  gradient: string;
  definition?: TemplateDefinition;
};

// ----------------------------------------------------------------------

export const BLANK_TEMPLATE_ID = 'blank';

export const templateCategories: { value: TemplateCategory | 'all'; labelKey: string }[] = [
  { value: 'all', labelKey: 'build.categories.all' },
  { value: 'profile', labelKey: 'build.categories.profile' },
  { value: 'landing', labelKey: 'build.categories.landing' },
  { value: 'form', labelKey: 'build.categories.form' },
  { value: 'portfolio', labelKey: 'build.categories.portfolio' },
  { value: 'sectioned', labelKey: 'build.categories.sectioned' },
];

// ----------------------------------------------------------------------

export const templateItems: Template[] = [
  {
    id: 'dummy-profile',
    nameKey: 'build.templates.dummyProfile',
    category: 'profile',
    icon: 'solar:user-rounded-bold',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    definition: { blocks: [{ type: 'heading' }, { type: 'text' }] },
  },
  {
    id: 'dummy-landing-1',
    nameKey: 'build.templates.dummyLanding1',
    category: 'landing',
    icon: 'solar:monitor-bold',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    definition: { blocks: [{ type: 'heading' }, { type: 'text' }] },
  },
  {
    id: 'dummy-landing-2',
    nameKey: 'build.templates.dummyLanding2',
    category: 'landing',
    icon: 'solar:pen-bold',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    definition: { blocks: [{ type: 'heading' }, { type: 'text' }] },
  },
  {
    id: 'dummy-form',
    nameKey: 'build.templates.dummyForm',
    category: 'form',
    icon: 'solar:chat-round-dots-bold',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    definition: { blocks: [{ type: 'heading' }, { type: 'form' }] },
  },
  {
    id: 'dummy-portfolio',
    nameKey: 'build.templates.dummyPortfolio',
    category: 'portfolio',
    icon: 'solar:gallery-wide-bold',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    definition: { blocks: [{ type: 'heading' }, { type: 'gallery' }] },
  },
  {
    id: 'dummy-showcase',
    nameKey: 'build.templates.dummyShowcase',
    category: 'sectioned',
    icon: 'solar:palette-bold',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    definition: { blocks: [{ type: 'heading' }, { type: 'text' }] },
  },
  {
    id: 'dummy-sectioned',
    nameKey: 'build.templates.dummySectioned',
    category: 'sectioned',
    icon: 'solar:box-minimalistic-bold',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    definition: { blocks: [{ type: 'heading' }, { type: 'section' }] },
  },
];
