import { Button } from "@mantine/core";
import { useModals } from "@mantine/modals";

import { Login } from "../../login/Login";

import "./Navbar.css";

export const Navbar = () => {
  const modals = useModals();

  const openContentModal = () => {
    modals.openModal({
      centered: true,
      children: <Login />,
    });
  };

  return (
    <div>
      <div className="navbar">
        <Button className="logo-home"></Button>
        <div className="container">
          <Button onClick={openContentModal} className="avatar">Accedi</Button>
          <Button className="uppics">Registrati</Button>
        </div>
      </div>
    </div>
  );
};
