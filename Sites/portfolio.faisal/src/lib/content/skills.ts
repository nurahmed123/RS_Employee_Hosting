import { SkillsSectionType } from '@/lib/types/sections';
import { getId } from '@/lib/utils/helper';

export const skillsSection: SkillsSectionType = {
  title: 'what i do',
  skills: [
    {
      id: getId(),
      title: 'hardware engineering',
      // animation lottie file: https://lottiefiles.com/
      lottie: {
        light: '/lotties/frontend.json',
        dark: '/lotties/frontend-dark.json',
      },
      points: [
        'Designing and building innovative robotics systems that respond to environmental inputs',
        'Creating custom sensor networks that capture and interpret real-world data',
        'Developing microcontroller-based solutions for complex automation challenges',
      ],
      softwareSkills: [
        // iconify icons: https://icon-sets.iconify.design/
        { name: 'arduino', icon: 'logos:arduino' },
        { name: 'raspberry-pi', icon: 'logos:raspberry-pi' },
        { name: 'python', icon: 'logos:python' },
        { name: 'c++', icon: 'logos:c-plusplus' },
        { name: 'circuit-design', icon: 'carbon:circuit-board' },
        { name: 'sensors', icon: 'mdi:motion-sensor' },
        { name: 'robotics', icon: 'mdi:robot' },
        { name: 'iot', icon: 'mdi:iot' },
        { name: 'cad', icon: 'mdi:cad' },
        { name: '3d-printing', icon: 'mdi:printer-3d' },
      ],
    },
    {
      id: getId(),
      title: 'AI & machine learning',
      lottie: {
        light: '/lotties/designing.json',
        dark: '/lotties/designing-dark.json',
      },
      points: [
        'Developing pattern recognition systems that find insights where humans cannot',
        'Creating machine learning models that enhance hardware capabilities',
        'Building systems that bridge the gap between physical sensors and intelligent decision-making',
      ],
      softwareSkills: [
        { name: 'tensorflow', icon: 'logos:tensorflow' },
        { name: 'python', icon: 'logos:python' },
        { name: 'data-analysis', icon: 'carbon:data-vis-4' },
        { name: 'computer-vision', icon: 'carbon:machine-learning-model' },
      ],
    },
  ],
};
