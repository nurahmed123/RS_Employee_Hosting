import { author } from '@/lib/content/portfolio';
import { ContactSectionType } from '@/lib/types/sections';

export const contactSection: ContactSectionType = {
  title: 'get in touch',
  subtitle: "what's next",
  paragraphs: [
    "I'm interested in projects that bridge hardware innovation with meaningful human experiences.",
    "Whether you have a challenging problem to solve, a collaborative opportunity, or just want to discuss the intersection of technology and creativity, my inbox is open.",
  ],
  link: `mailto:${author.email}`,
};
