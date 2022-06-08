import logo from "../../images/picsmi.png";
import { InputWithButton } from "../search/Srcbar";

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
                        <span>
                            Profilo
                        </span>
                        <span>
                            Gruppi
                        </span>
                    </div>
                </div>
            </nav>
        </>
    )
}