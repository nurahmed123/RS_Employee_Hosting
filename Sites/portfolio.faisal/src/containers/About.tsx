'use client';
import { aboutSection } from '@/lib/content/about';
import { author } from '@/lib/content/portfolio';
import { getId } from '@/lib/utils/helper';

import { AuthorImage, Link, ListItem, Wrapper } from '@/components';

import { getSectionAnimation } from '@/styles/animations';

import { useEffect, useState } from 'react';

const About = () => {
  const { title, img, list } = aboutSection;
  // To avoid hydration error
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
    <Wrapper id="about" {...getSectionAnimation}>
      <h2 className="heading-secondary">{title}</h2>
      <main className="flex flex-col items-center gap-16 lg:items-start lg:flex-row">
        <div className="space-y-4 lg:w-3/5">
          <p>
            I was born in the quiet heart of Bangladesh, where the hum of village life and the whisper of monsoon rains shaped my earliest curiosities. My world began in Tangail, wandered through Natore, and was always tethered to the ancestral soil of Chapainawabganj and Rajshahi.
          </p>
          <p>
            With hands-on experience in both research and development, I focus on building solutions that not only push boundaries but also make a real difference. My goal is to create technologies that inspire, solve problems, and shape a better future.
          </p>
          <p>
            I work across areas like Aerospace, AI, Military, Healthcare, and Sustainable energy, always exploring ways to turn ideas into impactful prototypes. From hydrogen-powered engines to healthcare bio-kits, I'm passionate about innovation that addresses global challenges.
          </p>
          <p>
            I build not just to solve problems, but to create meaningful impact—for communities, for the future, and for the world we share.
          </p>

          {list && (
            <>
              <p>{list.title}</p>
              <ul className="grid w-2/3 grid-cols-2 gap-1 text-sm">
                {list.items.map((item) => (
                  <ListItem key={getId()}>{item}</ListItem>
                ))}
              </ul>
            </>
          )}
        </div>
        <AuthorImage src={img} alt={author.name} />
      </main>
    </Wrapper>
  ) : (
    <></>
  );
};

export default About;
