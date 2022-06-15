import logo from "../../images/picsmi.png";
import { InputWithButton } from "../search/Srcbar";
// import avatar from "../../images/avatar.svg";
import group from "../../images/group.svg";
import { Link } from "react-router-dom";

export const Navbar = () => {
const user = JSON.parse(sessionStorage.getItem('user'));
 
    return (
        <>
            <nav>
                <div className="wrapper-na">
                    <div className="log">
                        <img src={logo} title="logo smi" alt="company log" />
                    </div>
                    <div className="srcnav">
                        <InputWithButton className="bar"/>
                    </div>
                    <h4>Hello {user.first_name} {user.last_name}!</h4>
                    <div className="sign">
                        <Link to={`/users/${user.id}`}>
                            <button>
                                <img className="icong" src={`http://smear-backend.test//images/avatars/${user.avatar.name}`} title="Profilo" alt="company logo" />
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