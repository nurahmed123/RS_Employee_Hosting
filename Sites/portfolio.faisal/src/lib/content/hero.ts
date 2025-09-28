import { HeroSectionType } from '@/lib/types/sections';
import { resumeFileName } from '@/lib/utils/config';

export const heroSection: HeroSectionType = {
  subtitle: 'Hi, my name is',
  title: 'K M Faisal Shahriar.',
  tagline: 'I build at the intersection of innovation and impact.',
  description:
    "I'm Faisal, a developer and researcher based in Bangladesh, passionate about innovation and technology. I work across areas like Aerospace, AI, Military, Healthcare, and Sustainable energy, always exploring ways to turn ideas into impactful prototypes.",
  specialText: 'Where technology meets purpose and ideas become reality',
  cta: {
    title: 'see my resume',
    url: `/${resumeFileName}`,
    hideInDesktop: true,
  },
};
