import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveLink(currentPath);
    }, []);

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <Link to="/">
                    <li className="navbar-item">
                        <button className={`navbar-link ${activeLink === '/' ? 'active' : ''}`}>
                            About
                        </button>
                    </li>
                </Link>
                <Link to="/resume">
                    <li className="navbar-item">
                        <button className={`navbar-link ${activeLink === '/resume' ? 'active' : ''}`}>
                            Resume
                        </button>
                    </li>
                </Link>
                <Link to="/portfolio">
                    <li className="navbar-item">
                        <button className={`navbar-link ${activeLink === '/portfolio' ? 'active' : ''}`}>
                            Portfolio
                        </button>

                    </li>
                </Link>
                <Link to="/contact">
                    <li className="navbar-item">
                        <button className={`navbar-link ${activeLink === '/contact' ? 'active' : ''}`}>
                            Contact
                        </button>
                    </li>
                </Link>
            </ul>
        </nav>
    )
};



export default Navbar;
