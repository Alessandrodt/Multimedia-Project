import { useEffect, useState } from "react";

// Components imports
import { GroupContainer } from "./GroupContainer";
import { NavbarGroups } from "./navbar-groups/NavbarGroups";
import { NotOwnedGroupContainer } from "./NotOwnedGroupContainer";

// Services
import groupsServices from "../../services/groupsServices";

// Libraries
import { Button, Card, SimpleGrid, TextInput } from "@mantine/core";
import { t } from "i18next";

// Errors
import toast from "react-hot-toast";

// Styles
import add from "../../images/add.svg";

export const Groups = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [groups, setGroups] = useState([]);
  const [groupsNotOwned, setGroupsNotOwned] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupManager, setGroupManager] = useState(true);

  // Conditional welcome message, checking the length of the groups state.
  // const initialMessage = groups.length
  // ? <h4> These are your groups! </h4>
  // : <h4> It seems you have no groups... why don't you create one? </h4>

  // useEffect hook, on page load all the groups created by the user are retrieved from the server.
  useEffect(() => {
    let ownedGroups = [];
    let notOwnedGroups = [];

    groupsServices
      .getUserGroups(user.id)
      .then((groups) => {
        groups.data.forEach(group => {
          group.pivot.is_owner
            ? ownedGroups.push(group)
            : notOwnedGroups.push(group);

          setGroups(ownedGroups);
          setGroupsNotOwned(notOwnedGroups);
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error(`${t("error_401")}`);
        }
      });
  }, [user.id]);

  // groupName handler.
  const handleChange = (event) => {
    setGroupName(event.target.value);
  };

  // Function to open the Create Group modal.
  const groupForm = (
    <Card>
      <div className="wrapper-group">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createGroup();
          }}
        >
          <p>{t("new_group")}</p>
          <div className="txt-imput-box-groups">
            <TextInput
              className="txt-input"
              defaultValue={groupName}
              label={t("group_title")}
              name="groupName"
              onChange={handleChange}
              placeholder={t("group_title")}
              required
            />
            <Button fullWidth type="submit">
              <img src={add} alt=""></img>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );

  // Object sent to the backend in the createGroup function
  const newGroup = {
    name: groupName,
  };

  // Function responsible for adding a group.
  const createGroup = () => {
    const existingGroup = groups.find((g) => g.name === groupName);

    if (existingGroup) {
      toast.error(`${groupName} ${t("group_exists")}`);
    } else {
      groupsServices
        .createGroup(user.id, newGroup)
        .then((res) => {
          setGroups(groups.concat(res.data));
          setGroupName("");
          toast.success(`${groupName} ${t("group_created")}`);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            toast.error(`${t("error_401")}`);
          } else {
            toast.error(`${t("group_name_short")}`);
          }
        });
    }
  };

  const showGroups = () => {
    if (groupManager) {
      return (
        groups.map((group) => (
          <GroupContainer
            className="group-cont"
            key={group.name}
            groupName={group.name}
            groupDetails={`/users/${user.id}/groups/${group.id}/details`}
            groupSharing={`/users/${user.id}/groups/${group.id}/share`}
          />
        ))
      )
    } else {
      return (
        groupsNotOwned.map((group) => (
          <NotOwnedGroupContainer
          className="group-cont"
          key={group.name}
          groupName={group.name}
          sharedGroup={`/users/${user.id}/groups/${group.id}/shared`}
          />
        ))
      )
    }
  }

  const groupInfo = groupManager
    ? `${t("my_groups")}`
    : `${t("not_owned_groups")}`

  return (
    <>
      <NavbarGroups />
      <section className="group-box">
        {groupForm}
        <Button onClick={() => setGroupManager(!groupManager)}> {t("groups_switch")} </Button>
        <h3> {groupInfo} </h3>
        {/* A map to create a list item for each group name */}
        <SimpleGrid className="wrapper-grid" cols={3} spacing="lg">
          {showGroups()}
        </SimpleGrid>
      </section>
    </>
  );
};
