import { HeroSectionType } from '@/lib/types/sections';
import { resumeFileName } from '@/lib/utils/config';

export const heroSection: HeroSectionType = {
  subtitle: 'Hi, my name is',
  title: 'Mahdi Bin Ferdaus.',
  tagline: 'I build at the intersection of hardware and thought.',
  description:
    "If a wire can dream, does it dream in copper or in light? When failure knocks, is it a wall… or the blueprint for a door? I live somewhere between the pulse of machines and the silence that teaches them.",
  specialText: 'Where machines learn and the human hand still leaves its mark',
  cta: {
    title: 'see my resume',
    url: `/${resumeFileName}`,
    hideInDesktop: true,
  },
};
