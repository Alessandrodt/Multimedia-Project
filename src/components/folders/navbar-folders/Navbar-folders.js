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
                <div className="sign">
                        <Link to={`/users/${user.id}`}>
                            <button>
                                <img className="icong" src={user?.avatar?.name ? `http://smear-backend.test//images/avatars/${user?.avatar?.name}` : defaultAvatar } title="Profilo" alt="company logo" />
                            </button>
                        </Link>
                        <button>
                            <img className="icong" src={group} title="Groups" alt="company logo" />
                        </button>
                    </div>
            </div>
        </nav>
    </>
  )
}