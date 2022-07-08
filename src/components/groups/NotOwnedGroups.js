import { useEffect } from "react";

// Services
import groupsServices from "../../services/groupsServices";

export const NotOwnedGroups = () => {
  useEffect(() => {
    groupsServices.getAllGroups().then((groups) => {
      const test = groups.data.map((group) => group.name);
      console.log(test);
    });
  }, []);

  return <p> Ciaone </p>;
};
