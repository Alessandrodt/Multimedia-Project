// React Imports
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Services
import folderSharingServices from "../../services/folderSharingServices";
import groupsServices from "../../services/groupsServices";

// Mantine imports
import { Avatar, Card, Group, Text } from "@mantine/core";

// Style
import folderEmpty from "../../images/folder_icon_empty.svg";
import folderWithElement from "../../images/folder_icon.svg";

export const NotOwnedGroup = () => {
  const { groupId, userId } = useParams();
  const [sharedFolders, setSharedFolders] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);

  useEffect(() => {
    folderSharingServices.getSharedFolders(userId, groupId).then((response) => {
      setSharedFolders(response.data)
    });

    groupsServices.getUserGroups(userId).then((groups) => {
      const i = groups.data.findIndex((item) => item.id == groupId);
      setGroupUsers(groups.data[i].users || []);
    });
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
            ? <Text> Owner</Text>
            : null
          }
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      {rows}
      <div>
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
    </>
  );
};
