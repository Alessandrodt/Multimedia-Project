import { Link } from "react-router-dom";

import defaultAvatar from "../../../images/user.svg";
import logo from "../../../images/picsmi.png";

export const NavbarGroups = () => {
    
const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <>
            <nav>
                <div className="wrapper-groups">
                    <div className="logo">
                        <Link to={`/Home`}>
                            <img src={logo} title="logo smi" alt="company log" />
                        </Link>
                    </div>
                    <div className="wrapper-info-groups">
                        {/* Link Folders */}
                        <Link to={`/Home`}>
                            <span className="link-to link-to-home">Home</span>
                        </Link>
                        <Link to={`/users/${user.id}/folders`}>
                            <span className="link-to link-to-folders">Folders</span>
                        </Link>
                        {/* Link User */}
                        <h6>
                        {user.first_name} {user.last_name}
                        </h6>
                        <Link className="icon" to={`/users/${user.id}`}>
                            <img className="icong" src={user?.avatar?.name ? `https://smi-laravel.fly.dev/images/avatars/${user?.avatar?.name}` : defaultAvatar } title="Profilo" alt="company logo" />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}