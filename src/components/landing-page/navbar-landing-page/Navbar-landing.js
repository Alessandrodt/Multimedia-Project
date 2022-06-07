import { Button } from "@mantine/core";
import { Login } from "../../login/Login";
import { useModals } from "@mantine/modals";

import "./Navbar.css";

export const Navbar = () => {
  const modals = useModals();

  const openContentModal = () => {
    modals.openModal({
      children: <Login />,
    });
  };

  return (
    <div>
      <div className="navbar">
        <Button className="logo-home"></Button>
        <div className="container">
          <Button onClick={openContentModal} className="avatar">
            {" "}
            Accedi
          </Button>
          <Button className="uppics">Registrati</Button>
        </div>
      </div>
    </div>
  );
};
