import React from 'react';
import app from '../assets/icon-app.svg'
import design from '../assets/icon-design.svg'
import dev from '../assets/icon-dev.svg'
import figma from '../assets/logo-figma.svg'

const AboutMe = () => (
    <article className="about active">

        <header>
            <h2 className="h2 article-title">About me</h2>
        </header>

        <section className="about-text">
            <p>
                Greetings,<br />

                I'm a passionate Computer Science graduate and versatile Full Stack Developer proficient in both MERN (MongoDB, Express.js, React, Node.js) and PHP technology stacks.
            </p>

            <p>
                On the front-end, I craft engaging user interfaces using React, harnessing its power to deliver dynamic and intuitive experiences. Meanwhile, I leverage the capabilities of PHP to develop robust back-end solutions, ensuring the smooth functioning of applications and effective data management.
            </p>
            <p>I thrive in collaborative environments and welcome the opportunity to collaborate with cross-functional teams. Whether it's brainstorming new features, troubleshooting issues, or optimizing workflows, I'm driven by a shared goal of delivering exceptional results.</p>

            <p>Let's connect! Whether you're interested in discussing tech trends, exploring potential collaborations, or simply having a meaningful conversation, feel free to reach out. Together, we can transform ideas into impactful digital solutions!</p>
        </section>

        <section className="service">

            <h3 className="h3 service-title">What I'm doing</h3>

            <ul className="service-list">

                <ServiceItem
                    iconSrc={design}
                    title="Web design"
                    text="The most modern and high-quality design made at a professional level."
                />

                <ServiceItem
                    iconSrc={dev}
                    title="Web development"
                    text="High-quality development of sites at the professional level."
                />

                <ServiceItem
                    iconSrc={app}
                    title="Mobile apps"
                    text="Professional development of applications for iOS and Android."
                />

                <ServiceItem
                    iconSrc={figma}
                    title="UI UX Designing"
                    text="I make high-quality photos of any category at a professional level."
                />

            </ul>

        </section>

    </article>
);

const ServiceItem = ({ iconSrc, title, text }) => (
    <li className="service-item">
        <div className="service-icon-box">
            <img src={iconSrc} alt={`${title} icon`} width="40" />
        </div>
        <div className="service-content-box">
            <h4 className="h4 service-item-title">{title}</h4>
            <p className="service-item-text">{text}</p>
        </div>
    </li>
);



export default AboutMe;
