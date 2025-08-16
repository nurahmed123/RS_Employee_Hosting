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
            What began as a child's wonder grew into an unyielding craft. I learned to make ideas breathe—whether in the form of a robot that thinks, a sensor that listens to the wind, or a code that can see patterns where humans cannot. My projects have carried me from local science fairs to international stages, from setbacks that taught me resilience to moments where the work spoke louder than any introduction.
          </p>
          <p>
            I work at the meeting point of hardware and thought, where machines learn and the human hand still leaves its mark. My tools are not only soldering irons, microcontrollers, and CAD models, but also the long nights of iteration, the discipline of failure, and the belief that technology can be both precise and poetic.
          </p>
          <p>
            I build not just to solve problems, but to ask new questions—of the world, and of myself.
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
