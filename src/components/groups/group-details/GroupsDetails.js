import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import { NavbarGroups } from "../navbar-groups/NavbarGroups";

// Services
import groupsServices from "../../../services/groupsServices";

// Libraries
import { Avatar, Group, Text, Button, Input } from "@mantine/core";
import toast from "react-hot-toast";
import { Search } from "tabler-icons-react";
import { useParams } from "react-router-dom";
import { useModals } from "@mantine/modals";
import { t } from "i18next";

// Styles
import add from "../../../images/add.svg";
import defaultAvatar from "../../../images/user.svg";

export const GroupsDetails = () => {
  const { groupId } = useParams();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [group, setGroup] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // Searches users in the database by their email to add them to the group.
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };
  const search = searchInput;

  useEffect(() => {
    if (search !== "" && search.length >= 2) {
      groupsServices.searchUser(search).then((searchResult) => {
        setSearchResult(
          searchResult.data.filter((u) =>
            u.email.toLowerCase().includes(search)
          )
        );
      });
    } else {
      setSearchResult("");
    }
  }, [search]);

  // Adds an user to the group. Obviously doesn't allow to add an already existing user.
  const addUser = (user) => {
    groupsServices
      .addUser(groupId, user.id)
      .then((res) => {
        setGroup(group.concat(user));
        toast.success(
          `${user.first_name} ${user.last_name} ${t("group_add_user_success")}`
        );
      })
      .catch((err) => {
        if (err.response.status === 422) {
          toast.error(
            `${user.first_name} ${user.last_name} ${t("group_add_user_exists")}`
          );
        }
      });
  };

  // Deletes the user of choice from the group by their ID.
  const deleteUser = (user) => {
    groupsServices
      .deleteUser(groupId, user.id)
      .then((res) => {
        setGroup(group.filter((u) => u.id !== user.id));
        toast.success(
          `${user.first_name} ${user.last_name} ${t("group_remove_user")}`
        );
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast.error(`${t("group_remove_owner")}`);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error(`${t("group_user_not_found")}`);
        }
      });
  };

  //  Loads all the users in the selected group.
  useEffect(() => {
    groupsServices.getUserGroups(user.id).then((groups) => {
      groups.data.map((item) => item.users);
      // eslint-disable-next-line eqeqeq
      const i = groups.data.findIndex((item) => item.id == groupId);
      setGroup(groups.data[i].users || []);
    });
  }, [user.id, groupId]);

  // Confirmation modal to delete an user from the group.
  const modals = useModals();

  const openDeleteModal = (user) =>
    modals.openConfirmModal({
      title: `${t("delete_user_from_group")}`,
      centered: true,
      children: <Text size="sm">{t("group_user_delete")}</Text>,
      labels: { confirm: `${t("group_user_delete_button")}`, cancel: "No" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteUser(user),
    });

  // Maps the group array by its lenght to append rows.
  const rows = group.map((user) => (
    <tr key={user.id}>
      <td>
        <Group spacing="sm">
          <Avatar
            size={40}
            src={
              user?.avatar_id
                ? `https://smi-laravel.fly.dev/images/avatars/avatar-${user?.avatar_id}.svg`
                : defaultAvatar
            }
            radius={30}
          />
          <Text size="sm" weight={500}>
            {user.first_name} {user.last_name}
          </Text>
          <Text size="sm" weight={500}>
            {user.email}
          </Text>
        </Group>
        <button
          className="deleteUser"
          color="red"
          onClick={() => openDeleteModal(user)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            width="20px"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
          </svg>
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <NavbarGroups></NavbarGroups>
      <div className="back">
            <Link to={`/users/${user.id}/groups`}>
              <span>{t("group_back")}</span>
            </Link>
          </div>
      <section className="wrapper-group-details">
        <div className="box-txt-table-groups">
          <h3>{t("group_members")}</h3>
          <table
            className="wrapper-table "
            style={group.length === 0 ? { opacity: 0 } : { opacity: 1 }}
          >
            <tbody>{rows}</tbody>
          </table>
        </div>
        <div className="box-src-group">
          <div className="searchText">
            <h3>{t("group_add_user")}</h3>
          </div>
          <div className="search-box-group">
            <Input
              icon={<Search size={20} />}
              placeholder={t("group_search_user_email")}
              defaultValue={searchInput}
              onChange={handleSearch}
            />
          </div>
          <ul
            style={
              searchResult.length === 0
                ? { display: "none" }
                : { display: "block" }
            }
          >
            {searchResult.length > 0
              ? searchResult.map((user) => (
                  <li key={user.id}>
                    <span>
                      <Avatar size={30} src={user.avatar} radius={30} />{" "}
                      <p>
                        {user.first_name} {user.last_name}
                      </p>
                    </span>{" "}
                    <span>{user.email}</span>{" "}
                    <Button
                      className="addUser"
                      p={10}
                      ml={10}
                      onClick={() => addUser(user)}
                    >
                      <img src={add} alt=""></img>
                    </Button>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </section>
    </>
  );
};
