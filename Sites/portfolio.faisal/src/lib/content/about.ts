import { AboutSectionType } from '@/lib/types/sections';

export const aboutSection: AboutSectionType = {
  title: 'about me',
  // Paragraphs need to be changed from `/containers/About.tsx`
  // Because it wasn't possible to insert anchor tags like this
  list: {
    title: 'Here are a few technologies and skills I work with:',
    items: [
      'Web Development',
      'Python Programming',
      'Research & Prototyping',
      'Arduino & IoT',
      'AI & Machine Learning',
      'Circuit Design',
    ],
  },
  img: 'https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/e5538bbd-f11e-4cf9-b16f-c7c638f9ad6f.jpeg',
};
