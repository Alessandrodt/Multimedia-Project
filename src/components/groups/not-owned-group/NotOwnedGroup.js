// React Imports
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {NavbarGroups} from "../navbar-groups/NavbarGroups"

// Services
import groupsServices from "../../../services/groupsServices";
import folderSharingServices from "../../../services/folderSharingServices";

// Mantine imports
import { Avatar, Card, Group, Text } from "@mantine/core";

// Translation
import { t } from "i18next";

// Style
import folderEmpty from "../../../images/folder_icon_empty.svg";
import folderWithElement from "../../../images/folder_icon.svg";

export const NotOwnedGroup = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { groupId, userId } = useParams();
  const [groupUsers, setGroupUsers] = useState([]);
  const [sharedFolders, setSharedFolders] = useState([]);

  useEffect(() => {
    groupsServices.getUserGroups(userId).then((groups) => {
      const i = groups.data.findIndex((item) => item.id == groupId);
      setGroupUsers(groups.data[i].users || []);
    });

    folderSharingServices.getSharedFolders(userId, groupId).then((folders) => {
      console.log(folders.data);
      setSharedFolders(folders.data);
    })
  }, [groupId, userId]);

  
  const rows = groupUsers.map((user) => (
    <tr key={user.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={`https://smi-laravel.fly.dev/images/avatars/avatar-${user.avatar_id}.svg`} radius={30} />
          <Text size="sm" weight={500}>
            {user.first_name} {user.last_name}
          </Text>
          <Text size="sm" weight={500}>
            {user.email}
          </Text>
          {user.pivot.is_owner
            ? <Text> {t("owner")} </Text>
            : null
          }
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
    <NavbarGroups/>
    <div className="box-wrapper-folders-notowned">
        <div className="box-txt-table-groups">
            <h3>{t("group_members")}</h3>
            <table
              className="wrapper-table "
              style={groupUsers.length === 0 ? { opacity: 0 } : { opacity: 1 }}
            >
              <tbody>{rows}</tbody>
            </table>
          </div>
        <div className="box-notowned-folders">
          <h2>{t("folders")}</h2>
          {sharedFolders.map(sharedFolder => {
            return (
              <Card className="card" key={sharedFolder.id}>
                  <Link to={`/users/${userId}/groups/${groupId}/shared/${sharedFolder.id}`}>
                    <span
                      className="slider"
                    >
                      <img
                        src={
                          sharedFolder.folders === 0
                            ? folderEmpty
                            : folderWithElement
                        }
                        alt=""
                      />
                      <p>{sharedFolder.name}</p>
                    </span>
                  </Link>
              </Card>
            )
          })}
        </div>
      </div>
      <div className="box-back">
      <div className="back">
            <Link to={`/users/${user.id}/groups`}>
              <span>{t("group_back")}</span>
            </Link>
          </div>
      </div>
    </>
  );
};
