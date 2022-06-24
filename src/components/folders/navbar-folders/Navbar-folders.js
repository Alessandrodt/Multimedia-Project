import { Link } from 'react-router-dom'

import defaultAvatar from "../../../images/user.svg";
import group from "../../../images/group.svg";
import logo from '../../../images/picsmi.png'


export const Navbar = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <>
        <nav>
            <div className="wrapper-na">
                <div className="log">
                    <img src={logo} title="logo smi" alt="company log" />
                </div>
                <div id='sig' className="sign">
                        <Link to={`/users/${user.id}`}>
                            <button id='btn-prf'>
                                <img className="icong" src={user?.avatar?.name ? `https://smi-laravel.fly.dev/images/avatars/${user?.avatar?.name}` : defaultAvatar } title="Profilo" alt="company logo" />
                            </button>
                        </Link>
                        <button id='btn-grp'>
                            <img className="icong" src={group} title="Groups" alt="company logo" />
                        </button>
                    </div>
            </div>
        </nav>
    </>
  )
}