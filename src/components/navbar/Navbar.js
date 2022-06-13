import logo from "../../images/picsmi.png";
import { InputWithButton } from "../search/Srcbar";
import avatar from "../../images/avatar.svg";
import group from "../../images/group.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import profileServices from "../../services/profileServices";
export const Navbar = () => {
    const {userId} = useParams();
    const [users, setUsers] = useState([]);

    useEffect (() => {
      profileServices.getUser(userId).then((response) => {
        setUsers(response.data);
      });
    });

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
                    <div className="sign">
                        <Link to={`/users/:userId`}>
                        <button>
                        <img className="icong" src={avatar} title="Profilo" alt="company logo" />
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