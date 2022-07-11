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
  console.log(groups);
  console.log(groupsNotOwned);
  // useEffect hook, on page load all the groups where the user is present.
  // Then the data is passed through a forEach, where the is_owner status is checked.
  // If it's true, the group item is pushed in the ownedGroups, else into notOwnedGroups.
  // After this process, both arrays get stored into two separate states.
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
              maxLength={20}
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
    // This const searches through a find method for matching group names.
    const existingGroup = groups.find((g) => g.name === groupName);

    // If a group name already exists, displays an error.
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

  // This function checks the boolean state groupManager.
  // On boolean change the two group states are switched and shown.
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

  // A simple text box to display what kind of groups the user is looking at.
  const groupInfo = groupManager
    ? `${t("my_groups")}`
    : `${t("not_owned_groups")}`

  return (
    <>
      <NavbarGroups />
      <section className="group-box">
        {groupForm}
        <div className="wrapper-group-style">
          <div className="group-form">
            <h3> {groupInfo}: </h3>
            <div className="wrapper-switch">
              <Button className="switch-group" onClick={() => setGroupManager(!groupManager)}>
                {/* icon switch */}
                <svg viewBox="0 0 169 163" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="left-arrow" d="M44.4 32.7C45.6 33.2 46.6 33 47.5 33C83.5 33 119.5 33 155.5 33C160.9 33 165.2 34.9 167.4 40C171.3 48.6 165.5 57.3 156 57.4C119.8 57.4 83.7 57.4 47.5 57.4C46.5 57.4 45.6 57.4 44.2 57.4C45.8 59.7 47.6 61.1 49.3 62.6C52.1 65.2 55.1 67.6 57.6 70.6C61.7 75.4 61.5 82.1 57 86.7C52.6 91.2 46 91.8 41.2 87.7C33.7 81.2 26.4 74.5 19.1 67.8C14.4 63.6 9.80002 59.3 5.10002 55C-1.39998 49.1 -1.69998 41 4.70002 35.1C16.1 24.4 27.8 13.9 39.4 3.50001C43.8 -0.499986 50 -0.999986 54.7 1.90001C59.2 4.70001 61.5 10.7 60.1 15.6C59.3 18.4 57.5 20.4 55.4 22.3C51.9 25.5 48.4 28.8 45 32C44.8 32.1 44.7 32.3 44.4 32.7Z" />
                  <path className="right-arrow" d="M124.1 129.6C123.2 129.1 122.2 129.4 121.2 129.4C85.3 129.4 49.4 129.4 13.5 129.4C9.80001 129.4 6.40001 128.7 3.70001 126C0.30001 122.7 -0.79999 117.3 1.10001 112.6C3.00001 107.9 6.60001 105.2 11.6 105.2C26.6 105.1 41.6 105.1 56.6 105.1C78.1 105.1 99.6 105.1 121.1 105.1C122.1 105.1 123.1 105.1 124.4 105.1C123.1 102.9 121.3 101.6 119.7 100.1C116.8 97.4 113.6 94.9 111.1 91.8C107.2 87.2 107.3 81.3 111.2 77C115.6 72.3 122.4 71.2 127.2 74.6C131 77.3 134.1 80.6 137.5 83.6C146.4 91.5 155.1 99.6 163.9 107.6C170 113.2 170.3 120.8 164.4 126.4C154.4 135.8 144.2 145 134.1 154.3C132.1 156.2 130.1 158.2 127.9 159.8C122.6 163.7 115 162.7 111.1 157.8C106.8 152.4 107.3 145.5 112.5 140.7C116.2 137.3 119.8 133.9 123.5 130.5C123.8 130.4 124.2 130.2 124.1 129.6Z" />
                  {/* <path className="left-arrow-hover" d="M44.4 32.7C45.6 33.2 46.6 33 47.5 33C83.5 33 119.5 33 155.5 33C160.9 33 165.2 34.9 167.4 40C171.3 48.6 165.5 57.3 156 57.4C119.8 57.4 83.7 57.4 47.5 57.4C46.5 57.4 45.6 57.4 44.2 57.4C45.8 59.7 47.6 61.1 49.3 62.6C52.1 65.2 55.1 67.6 57.6 70.6C61.7 75.4 61.5 82.1 57 86.7C52.6 91.2 46 91.8 41.2 87.7C33.7 81.2 26.4 74.5 19.1 67.8C14.4 63.6 9.80002 59.3 5.10002 55C-1.39998 49.1 -1.69998 41 4.70002 35.1C16.1 24.4 27.8 13.9 39.4 3.50001C43.8 -0.499986 50 -0.999986 54.7 1.90001C59.2 4.70001 61.5 10.7 60.1 15.6C59.3 18.4 57.5 20.4 55.4 22.3C51.9 25.5 48.4 28.8 45 32C44.8 32.1 44.7 32.3 44.4 32.7Z" />
                  <path className="right-arrow-hover" d="M124.1 129.6C123.2 129.1 122.2 129.4 121.2 129.4C85.3 129.4 49.4 129.4 13.5 129.4C9.80001 129.4 6.40001 128.7 3.70001 126C0.30001 122.7 -0.79999 117.3 1.10001 112.6C3.00001 107.9 6.60001 105.2 11.6 105.2C26.6 105.1 41.6 105.1 56.6 105.1C78.1 105.1 99.6 105.1 121.1 105.1C122.1 105.1 123.1 105.1 124.4 105.1C123.1 102.9 121.3 101.6 119.7 100.1C116.8 97.4 113.6 94.9 111.1 91.8C107.2 87.2 107.3 81.3 111.2 77C115.6 72.3 122.4 71.2 127.2 74.6C131 77.3 134.1 80.6 137.5 83.6C146.4 91.5 155.1 99.6 163.9 107.6C170 113.2 170.3 120.8 164.4 126.4C154.4 135.8 144.2 145 134.1 154.3C132.1 156.2 130.1 158.2 127.9 159.8C122.6 163.7 115 162.7 111.1 157.8C106.8 152.4 107.3 145.5 112.5 140.7C116.2 137.3 119.8 133.9 123.5 130.5C123.8 130.4 124.2 130.2 124.1 129.6Z" /> */}
                </svg>
              </Button>
              <span className="group-switch">{t("groups_switch")}</span>
            </div>
          </div>
          {/* A map to create a list item for each group name */}
          <SimpleGrid className="wrapper-grid" cols={4} spacing="lg">
            {showGroups()}
          </SimpleGrid>
        </div>
      </section>
    </>
  );
};
