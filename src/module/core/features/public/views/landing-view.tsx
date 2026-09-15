import { Box } from '@mui/material';

import { LandingHero } from '../components/landing/hero-section';
import { LandingClosingCta } from '../components/landing/closing-cta';
import { LandingPricing } from '../components/landing/pricing-section';
import { LandingFeatures } from '../components/landing/features-section';
import { LandingDemoShowcase } from '../components/landing/demo-showcase';

// ----------------------------------------------------------------------

export function LandingView() {
  return (
    <Box>
      <LandingHero />
      <LandingDemoShowcase />
      <LandingFeatures />
      <LandingPricing />
      <LandingClosingCta />
    </Box>
  );
}
