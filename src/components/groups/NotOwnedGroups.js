import { useEffect } from "react";
import { useParams } from "react-router-dom";
import folderSharingServices from "../../services/folderSharingServices";

// Services
import groupsServices from "../../services/groupsServices";


export const NotOwnedGroups = () => {
  const { groupId, userId } = useParams();

  useEffect(() => {
    folderSharingServices.getSharedFolders(userId, groupId).then((response) => {
      console.log(response.data)
    })
  }, []);

  return <p> Ciaone </p>;
};
