import logo from "../../images/picsmi.png";
import { InputWithButton } from "../search/Srcbar";

export const Navbar = () => {

    return (
        <>
            <nav>
                <div className="wrapper-nav">
                    <div className="logo">
                        <img src={logo} title="logo smi" alt="company logo" />
                    </div>
                    <div className="srcnav">
                        <InputWithButton className="bar"/>
                    </div>
                    <div className="signUp">
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