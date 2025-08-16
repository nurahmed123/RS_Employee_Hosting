import { AboutSectionType } from '@/lib/types/sections';

export const aboutSection: AboutSectionType = {
  title: 'about me',
  // Paragraphs need to be changed from `/containers/About.tsx`
  // Because it wasn't possible to insert anchor tags like this
  list: {
    title: 'Here are a few technologies and skills I work with:',
    items: [
      'Microcontrollers',
      'Robotics',
      'Sensor Systems',
      'Circuit Design',
      'AI/ML',
      'CAD Modeling',
    ],
  },
  img: '/vatsal-singh.png', // Will need to be replaced with appropriate image
};
