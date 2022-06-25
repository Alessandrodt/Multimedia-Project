import { Link } from "react-router-dom";

import defaultAvatar from "../../../images/user.svg";
import logo from "../../../images/picsmi.png";

export const NavbarGroups = () => {
    
const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <>
            <nav>
                <div className="wrapper-na">
                    <div className="logo">
                        <img src={logo} title="logo smi" alt="company log" />
                    </div>
                    <div className="navig">
                        <Link to={`/users/${user.id}`}>
                            <button>
                                <img className="icong" src={user?.avatar?.name ? `https://smi-laravel.fly.dev/images/avatars/${user?.avatar?.name}` : defaultAvatar } title="Profilo" alt="company logo" />
                            </button>
                        </Link>
                        <Link to={`/users/${user.id}/folders`}>
                            <button>
                                <span>Folders</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}