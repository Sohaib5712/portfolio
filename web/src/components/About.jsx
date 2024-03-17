import React from 'react';

const AboutMe = () => (
    <article className="about active">

        <header>
            <h2 className="h2 article-title">About me</h2>
        </header>

        <section className="about-text">
            <p>
                Greetings,<br />

                I am a dedicated Computer Science graduate with a passion for creating seamless digital experiences. As a
                Full Stack Developer proficient in both MERN Stack and PHP, I am driven by the desire to turn innovative
                ideas into practical and elegant solutions.
            </p>

            <p>
                I am excited to embark on new challenges and contribute my technical prowess to a dynamic team or organization. If
                you're looking for a passionate Full Stack Developer who is well-versed in MERN Stack and PHP and thrives in
                collaborative environments, I'd welcome the opportunity to connect and explore how I can be an asset to your
                projects.
            </p>
        </section>

        <section className="service">

            <h3 className="h3 service-title">What I'm doing</h3>

            <ul className="service-list">

                <ServiceItem
                    iconSrc="./assets/images/icon-design.svg"
                    title="Web design"
                    text="The most modern and high-quality design made at a professional level."
                />

                <ServiceItem
                    iconSrc="./assets/images/icon-dev.svg"
                    title="Web development"
                    text="High-quality development of sites at the professional level."
                />

                <ServiceItem
                    iconSrc="./assets/images/icon-app.svg"
                    title="Mobile apps"
                    text="Professional development of applications for iOS and Android."
                />

                <ServiceItem
                    iconSrc="./assets/images/logo-figma.svg"
                    title="UI UX Designing"
                    text="I make high-quality photos of any category at a professional level."
                />

            </ul>

        </section>

        <section className="testimonials">

            <h3 className="h3 testimonials-title">Testimonials</h3>

            <ul className="testimonials-list has-scrollbar">
                <TestimonialItem
                    avatarSrc="./assets/images/avatar-1.png"
                    title="Daniel lewis"
                    text="Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of the client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia."
                />

                <TestimonialItem
                    avatarSrc="./assets/images/avatar-2.png"
                    title="Jessica miller"
                    text="Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of the client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia."
                />

                <TestimonialItem
                    avatarSrc="./assets/images/avatar-3.png"
                    title="Emily evans"
                    text="Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of the client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia."
                />

                <TestimonialItem
                    avatarSrc="./assets/images/avatar-4.png"
                    title="Henry william"
                    text="Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of the client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia."
                />
            </ul>

        </section>

        <div className="modal-container" data-modal-container>

            <div className="overlay" data-overlay></div>

            <TestimonialsModal
                avatarSrc="./assets/images/avatar-1.png"
                title="Daniel lewis"
                date="14 June, 2021"
                text="Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of the client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia."
            />

        </div>

        <section className="clients">

            <h3 className="h3 clients-title">Clients</h3>

            <ul className="clients-list has-scrollbar">

                <li className="clients-item">
                    <img src="./assets/images/logo-1-color.png" alt="client logo" />
                </li>

                <li className="clients-item">
                    <img src="./assets/images/logo-2-color.png" alt="client logo" />
                </li>

                <li className="clients-item">
                    <img src="./assets/images/logo-3-color.png" alt="client logo" />
                </li>

                <li className="clients-item">
                    <img src="./assets/images/logo-4-color.png" alt="client logo" />
                </li>

                <li className="clients-item">
                    <img src="./assets/images/logo-5-color.png" alt="client logo" />
                </li>

                <li className="clients-item">
                    <img src="./assets/images/logo-6-color.png" alt="client logo" />
                </li>

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

const TestimonialItem = ({ avatarSrc, title, text }) => (
    <li className="testimonials-item">
        <div className="content-card" data-testimonials-item>
            <figure className="testimonials-avatar-box">
                <img src={avatarSrc} alt={`${title} avatar`} width="60" data-testimonials-avatar />
            </figure>
            <h4 className="h4 testimonials-item-title" data-testimonials-title>{title}</h4>
            <div className="testimonials-text" data-testimonials-text>
                <p>{text}</p>
            </div>
        </div>
    </li>
);

const TestimonialsModal = ({ avatarSrc, title, date, text }) => (
    <section className="testimonials-modal">
        <button className="modal-close-btn" data-modal-close-btn>
            <ion-icon name="close-outline"></ion-icon>
        </button>
        <div className="modal-img-wrapper">
            <figure className="modal-avatar-box">
                <img src={avatarSrc} alt={`${title} avatar`} width="80" data-modal-img />
            </figure>
            <img src="./assets/images/icon-quote.svg" alt="quote icon" />
        </div>
        <div className="modal-content">
            <h4 className="h3 modal-title" data-modal-title>{title}</h4>
            <time dateTime="2021-06-14">{date}</time>
            <div data-modal-text>
                <p>{text}</p>
            </div>
        </div>
    </section>
);

export default AboutMe;
