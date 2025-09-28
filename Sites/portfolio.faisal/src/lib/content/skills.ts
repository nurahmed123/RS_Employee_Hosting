import { SkillsSectionType } from '@/lib/types/sections';
import { getId } from '@/lib/utils/helper';

export const skillsSection: SkillsSectionType = {
  title: 'what i do',
  skills: [
    {
      id: getId(),
      title: 'web development',
      // animation lottie file: https://lottiefiles.com/
      lottie: {
        light: '/lotties/frontend.json',
        dark: '/lotties/frontend-dark.json',
      },
      points: [
        'Building responsive and modern web applications with cutting-edge technologies',
        'Creating user-friendly interfaces that bridge complex backend systems',
        'Developing full-stack solutions from concept to deployment',
      ],
      softwareSkills: [
        // iconify icons: https://icon-sets.iconify.design/
        { name: 'html', icon: 'logos:html-5' },
        { name: 'css', icon: 'logos:css-3' },
        { name: 'javascript', icon: 'logos:javascript' },
        { name: 'python', icon: 'logos:python' },
        { name: 'git', icon: 'logos:git-icon' },
        { name: 'github', icon: 'logos:github-icon' },
        { name: 'react', icon: 'logos:react' },
        { name: 'nodejs', icon: 'logos:nodejs-icon' },
      ],
    },
    {
      id: getId(),
      title: 'research & prototyping',
      lottie: {
        light: '/lotties/designing.json',
        dark: '/lotties/designing-dark.json',
      },
      points: [
        'Conducting innovative research in aerospace, AI, and sustainable technologies',
        'Developing prototypes for hydrogen-powered engines and healthcare bio-kits',
        'Creating solutions for global challenges in energy, healthcare, and climate resilience',
      ],
      softwareSkills: [
        { name: 'research', icon: 'carbon:research' },
        { name: 'prototyping', icon: 'carbon:prototype' },
        { name: 'innovation', icon: 'carbon:innovation' },
        { name: 'analysis', icon: 'carbon:data-vis-4' },
      ],
    },
    {
      id: getId(),
      title: 'arduino & IoT',
      lottie: {
        light: '/lotties/coding.json',
        dark: '/lotties/frontend-dark.json',
      },
      points: [
        'Designing and building innovative IoT systems and smart devices',
        'Creating custom sensor networks for environmental monitoring',
        'Developing microcontroller-based solutions for automation challenges',
      ],
      softwareSkills: [
        { name: 'arduino', icon: 'logos:arduino' },
        { name: 'raspberry-pi', icon: 'logos:raspberry-pi' },
        { name: 'iot', icon: 'mdi:iot' },
        { name: 'sensors', icon: 'mdi:motion-sensor' },
        { name: 'robotics', icon: 'mdi:robot' },
        { name: 'circuit-design', icon: 'carbon:circuit-board' },
      ],
    },
    {
      id: getId(),
      title: 'AI & machine learning',
      lottie: {
        light: '/lotties/fullstack.json',
        dark: '/lotties/designing-dark.json',
      },
      points: [
        'Developing AI solutions for healthcare and military applications',
        'Creating machine learning models for pattern recognition and analysis',
        'Building intelligent systems that enhance decision-making processes',
      ],
      softwareSkills: [
        { name: 'tensorflow', icon: 'logos:tensorflow' },
        { name: 'python', icon: 'logos:python' },
        { name: 'machine-learning', icon: 'carbon:machine-learning-model' },
        { name: 'ai', icon: 'carbon:ai-results' },
      ],
    },
  ],
};
