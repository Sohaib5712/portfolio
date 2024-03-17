import React from 'react';

const AvatarBox = () => (
    <figure className="avatar-box">
        <img src="./assets/images/profile.jpg" alt="Portfolio-pic" width="80" style={{ borderRadius: '18%' }} />
    </figure>
);

const ContactInfo = ({ icon, title, link }) => (
    <li className="contact-item">
        <div className="icon-box">
            <ion-icon name={icon}></ion-icon>
        </div>
        <div className="contact-info">
            <p className="contact-title">{title}</p>
            {link ? <a href={link} className="contact-link">{link}</a> : null}
        </div>
    </li>
);

const Sidebar = () => (
    <aside className="sidebar" data-sidebar>
        <div className="sidebar-info">
            <AvatarBox />
            <div className="info-content">
                <h1 className="name" title="portfolio-name">Zeeshan Khalid</h1>
                <p className="title">Computer Scientist</p>
            </div>
            <button className="info_more-btn" data-sidebar-btn>
                <span>Show Contacts</span>
                <ion-icon name="chevron-down"></ion-icon>
            </button>
        </div>

        <div className="sidebar-info_more">
            <div className="separator"></div>
            <ul className="contacts-list">
                <ContactInfo icon="mail-outline" title="Email" link="mailto:zkhalid779@gmail.com" />
                <ContactInfo icon="phone-portrait-outline" title="Phone" link="tel:+92(335)0826941" />
                <ContactInfo icon="calendar-outline" title="Birthday" />
                <ContactInfo icon="location-outline" title="Location" />
            </ul>
            <div className="separator"></div>
            <ul className="social-list">
                <li className="social-item">
                    <a href="https://www.facebook.com/profile.php?id=100009584203175&mibextid=ZbWKwL" className="social-link">
                        <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                </li>
                <li className="social-item">
                    <a href="https://www.linkedin.com/in/zeeshan-khalid-574b2019a" className="social-link">
                        <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                </li>
                <li className="social-item">
                    <a href="https://instagram.com/zk779_?igshid=OGQ5ZDc2ODk2ZA==" className="social-link">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
);

export default Sidebar;
