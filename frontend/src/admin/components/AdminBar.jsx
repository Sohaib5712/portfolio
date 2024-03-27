import React, { useState, useEffect } from 'react'
import "./component.css"
import { Link } from 'react-router-dom'
import { useLogout } from '../../page/account/AdminLogout'
import logo from '../../assets/logo.png'
import { RiCashFill, RiLogoutCircleFill } from 'react-icons/ri'
import { FaUserAlt, FaHistory, FaProjectDiagram } from 'react-icons/fa'
import { FaMoneyBillTransfer } from "react-icons/fa6";

const AdminBar = () => {
    const [activeLink, setActiveLink] = useState('');
    const { logout } = useLogout();

    const handleClickLogout = () => {
        logout();
    };

    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveLink(currentPath);
    }, []);

    return (

        <div className='admin-sidebar'>
            <Link to={"/"}>
                <img src={logo} alt="" />
            </Link>
            <ul>
                <Link to={"/admin-dashboard"}>
                    <li className={activeLink === '/admin-dashboard' ? 'active' : ''}><FaProjectDiagram />Add Project</li>
                </Link>
                <Link to={"/add-user"}>
                    <li className={activeLink === '/add-user' ? 'active' : ''}><FaUserAlt />Benutzer</li>
                </Link>
                <Link to={"/add-fine"}>
                    <li className={activeLink === '/add-fine' ? 'active' : ''}><RiCashFill />Bußgeldverwaltung</li>
                </Link>
                <Link to={"/history"}>
                    <li className={activeLink === '/history' ? 'active' : ''}><FaHistory />Historie</li>
                </Link>
                <Link to={"/pay"}>
                    <li className={activeLink === '/pay' ? 'active' : ''}><FaMoneyBillTransfer />Strafe</li>
                </Link>

                <li onClick={handleClickLogout}><RiLogoutCircleFill />Ausloggen</li>


            </ul>
        </div>
    )
}

export default AdminBar
