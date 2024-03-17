import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from 'react-router-dom';
import { useLogout } from '../../page/account/AdminLogout'
import profile from '../../assets/profile.png'

const TopBar = () => {
    const { project_user } = useAuthContext();
    const [isDrop, setIsDrop] = useState(false)

    const { logout } = useLogout();

    const handleClickLogout = () => {
        logout();
    };

    return (
        <div className='top-bar'>
            <div className="profile" onClick={() => setIsDrop(!isDrop)}>
                <img src={profile} alt="" />
                <h3>{project_user && project_user.user}</h3>
            </div>
            {isDrop &&
                <div className="profile-dropdown">
                    <div className="profile-header">
                        {project_user.role}
                    </div>
                    <ul>
                        <Link to={"/profile"}>
                            <li>Profil</li>
                        </Link>
                        <li onClick={handleClickLogout}>Ausloggen</li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default TopBar
