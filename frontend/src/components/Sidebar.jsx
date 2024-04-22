import React, { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { IoPhonePortraitOutline, IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaSortDown } from "react-icons/fa";

import Portfolio from '../assets/Portfolio.png'

const AvatarBox = () => (
    <figure className="avatar-box">
        <img src={Portfolio} alt="Portfolio-pic" width="100" style={{ borderRadius: '15%' }} />
    </figure>
);

const ContactInfo = ({ icon, title, link, link_text, text }) => (
    <li className="contact-item">
        <div className="icon-box">
            {icon}
        </div>
        <div className="contact-info">
            <p className="contact-title">{title}</p>
            {link ? <a href={link} className="contact-link">{link_text}</a> : null}
            {text && <time>{text}</time>}
        </div>
    </li>
);

const Sidebar = () => {
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
        <aside className={`sidebar ${isSidebarActive ? 'active' : ''}`} data-sidebar>
            <div className="sidebar-info">
                <AvatarBox />
                <div className="info-content">
                    <h1 className="name" title="portfolio-name">M. Sohaib Sarwar</h1>
                    <p className="title">Computer Scientist</p>
                </div>
                <button className="info_more-btn" onClick={toggleSidebar}>
                    <span>Show Contacts</span>
                    <FaSortDown className='down-icon' />
                </button>
            </div>

            <div className={`sidebar-info_more ${isSidebarActive ? 'active' : ''}`}>
                <div className="separator"></div>
                <ul className="contacts-list">
                    <ContactInfo icon={<CiMail />} title="Email" link="mailto:sohaibsarwar2001@gmail.com" link_text={"sohaibsarwar2001@gmail.com"} />
                    <ContactInfo icon={<IoPhonePortraitOutline />} title="Phone" link="tel:+92310 8785712" link_text={"+92310 8785712"} />
                    {/* for DOB */}
                    <li className="contact-item">
                        <div className="icon-box">
                            <IoCalendarOutline />
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Birthday</p>
                            <time>June 23, 2001</time>
                        </div>
                    </li>
                    {/* for address */}
                    <li className="contact-item">
                        <div className="icon-box">
                            <IoLocationOutline />
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Address</p>
                            <address>Sadar Bazar, G.M Abad, Faisalabad</address>
                        </div>
                    </li>
                </ul>
                <div className="separator"></div>
                <ul className="social-list">
                    <li className="social-item">
                        <a href="https://www.facebook.com/sohaib.sarwar.2361?mibextid=kFxxJD" target='_blank' rel='noreferrer' className="social-link">
                            <FaFacebook />
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="https://www.linkedin.com/in/sohaib-sarwar-85552827b" target='_blank' rel='noreferrer' className="social-link">
                            <FaLinkedin />
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="https://www.instagram.com/sohaib_ansari_000?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank' rel='noreferrer' className="social-link">
                            <FaInstagram className='down-icon' />
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
