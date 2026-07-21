import { Box } from '@mui/material';

import LandingHeader from './components/LandingHeader';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import BenefitsSection from './components/BenefitsSection';
import HowItWorksSection from './components/HowItWorksSection';
import DownloadSection from './components/DownloadSection';
import UsageGuideSection from './components/UsageGuideSection';
import AuthorsSection from './components/AuthorsSection';
import ContactSection from './components/ContactSection';
import LandingFooter from './components/LandingFooter';

export default function Landing() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        // `clip` en lugar de `hidden`: evita el scroll horizontal sin romper el
        // `position: sticky` de la barra superior.
        overflowX: 'clip',
        scrollBehavior: 'smooth',
        background: 'linear-gradient(270deg, #edf1f4, #a1c4fd, #c2e9fb, #ffffff)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 12s ease infinite',

        // Compensa la barra superior fija al navegar por anclas.
        '& section[id]': { scrollMarginTop: 88 },

        '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        '@keyframes floatY': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        '@keyframes floatXY': {
          '0%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(20px, -30px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },

        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: 0.5,
          zIndex: 0,
        },
        '&::before': {
          background: '#4facfe',
          top: '15%',
          right: '8%',
          animation: 'floatXY 10s ease-in-out infinite',
        },
        '&::after': {
          background: '#43e97b',
          top: '45%',
          left: '5%',
          animation: 'floatY 12s ease-in-out infinite',
        },
      }}
    >
      <LandingHeader />

      <Box component="main">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <DownloadSection />
        <UsageGuideSection />
        <AuthorsSection />
        <ContactSection />
      </Box>

      <LandingFooter />
    </Box>
  );
}
