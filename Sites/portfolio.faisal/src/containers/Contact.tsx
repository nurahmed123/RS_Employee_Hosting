import { contactSection } from '@/lib/content/contact';

import { Button, Wrapper } from '@/components';
import ContactForm from '@/components/ui/ContactForm';

import { getSectionAnimation } from '@/styles/animations';

const Contact = () => {
  const { subtitle, title, paragraphs, link } = contactSection;
  return (
    <Wrapper
      id="contact"
      className="max-w-5xl mx-auto !py-16 md:!py-24 mb-20 md:mb-32"
      {...getSectionAnimation}
    >
      <div className="text-center mb-16">
        <p className="mb-3 font-mono text-sm capitalize text-accent">
          {subtitle}
        </p>
        <h2 className="heading-secondary !mb-5">{title}</h2>

        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="w-full md:w-1/2">
          <ContactForm />
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Connect Directly</h3>
            <p className="mb-2">Prefer traditional communication?</p>
            <p className="text-accent font-mono">{link.replace('mailto:', '')}</p>
          </div>
          
          <Button type="link" size="lg" href={link} center className="mt-4">
            Send Email
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
