import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { InputWithButton } from "../search/Srcbar";

import logo from "../../images/picsmi.png";
// import avatar from "../../images/avatar.svg";
import group from "../../images/group.svg";

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
                    {users.map((user) => {
                        return (
                            <div>
                            <Link to={`/users/${user.id}`}>
                            <button>
                                <img className="icong" src={user.avatar.id} title="Profilo" alt="company logo" />
                            </button>
                            </Link>
                            </div>
                        )
                    })}
                    <div className="sign">
                        <button>
                        <img className="icong" src={group} title="Groups" alt="company logo" />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}