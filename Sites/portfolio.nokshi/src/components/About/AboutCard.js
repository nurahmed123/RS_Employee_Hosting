import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Fatima Mahzabin </span>
            from <span className="purple"> Rajshahi Bangladesh.</span>
            <br />
            I am Fatima Mahzabin, passionate about technology, problem-solving, and innovation. I am dedicated to exploring programming, robotics, and AI to create impactful solutions. As a competitive programmer, I continuously seek opportunities to challenge myself, learn new skills, and grow through hands-on projects and competitions. With a strong focus on AI and robotics, I aspire to contribute to cutting-edge advancements and build solutions that make a difference in the world. Always eager to embrace new challenges, I strive to improve and innovate in everything I do. 
            {/* <br />
            I have completed Integrated MSc (IMSc) in Maths and Computing at BIT
            Mesra.
            <br /> */}
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          {/* <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Fatima Nokshi</footer> */}
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
