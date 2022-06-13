import logo from "../../images/picsmi.png";
import { InputWithButton } from "../search/Srcbar";
import avatar from "../../images/avatar.svg";
import group from "../../images/group.svg";
import { DettaglioImg } from "../dettaglio-img/DettaglioImg";



export const Navbar = () => {
 
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
                        <button>
                        <img className="icong" src={avatar} title="Profilo" alt="company logo" />
                        </button>
                        <button>
                        <img className="icong" src={group} title="Groups" alt="company logo" />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}