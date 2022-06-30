import React, { useEffect, useState } from "react";

import {
  Avatar,
  Table,
  Group,
  Text,
  ScrollArea,
  Button,
  Input,
} from "@mantine/core";

import { ErrorMessage } from "../error-message/ErrorMessage";

import { Search } from 'tabler-icons-react';
import { useParams } from "react-router-dom";

import { useModals } from '@mantine/modals';

import groupsServices from "../../services/groupsServices";

import { NavbarGroups } from "./navbar-groups/NavbarGroups";

export const GroupsDetails = () => {
  const { groupId } = useParams();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [group, setGroup] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isReadonly, setIsReadonly] = useState(true);
  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Error message handling.
  const errorStyle = {
    color: color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
};

const handleMessage = (color, message) => {
    setColor(color);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
};

  // Searches users in the database by their email to add them to the group.
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  }
  const search = searchInput;

  useEffect(() => {
    if (search !== "" && search.length >= 2) {
      groupsServices.searchUser(search)
      .then(searchResult => {
          setSearchResult(searchResult.data.filter(u => u.email.includes(search)));
      })
    } else {
      setSearchResult("");
    }
    }, [search])
  
  // Adds an user to the group. Obviously doesn't allow to add an already existing user. 
  const addUser = (user) => {
    groupsServices.addUser(groupId, user.id)
    .then(res => {
      setGroup(group.concat(user))
    })
    .catch(err => {
      if (err.response.status === 422) {
        handleMessage("red", "This user is already in the group!")
      }
    })
  }
  
  // Deletes the user of choice from the group by their ID.
  const deleteUser = (user) => {
    groupsServices.deleteUser(groupId, user.id)
    .then(res => {
     setGroup(group.filter((u) => u.id !== user.id));
  })
  .catch(err => {
    if (err.response.status === 403) {
      handleMessage("red", "You don't own this group so you don't have the authorization to remove this user, or you are trying to remove yourself, which can't be done.")
    }
  })
  .catch(err => {
    if (err.response.status === 404) {
      handleMessage("red", "Group or user not found.")
    }
  })
  };
  
  // Confirmation modal to delete an user from the group.
  const modals = useModals();

  const openDeleteModal = (user) =>
    modals.openConfirmModal({
      title: 'Delete user?',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete {user.first_name} {user.last_name} from the group? You will be able to add them again at a later time.
        </Text>
      ),
      labels: { confirm: 'Delete user', cancel: "Cancel" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteUser(user),
    });

  // Maps the group array by its lenght to append rows.
  const rows = group.map((user) => (
    <tr key={user.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={user.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {user.first_name} {user.last_name}
          </Text>
          <Text size="sm" weight={500}>
            {user.email}
          </Text>
          <Button className="deleteUser" color="red" onClick={() => openDeleteModal(user)}> Delete </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <NavbarGroups></NavbarGroups>
      <div className="container">
        <div className="groupName">Nome gruppo</div>
      <table>
          <tbody style={
        group.lenght === 0
        ? { display : "none"}
        : { display : "block"}
      }>
            {rows}
            </tbody>
            </table>
            <div className="searchText">
              Want to add someone to this group? Search them here!
            </div>
            <div className="search">
                <Input
                  icon={<Search size={20} />}
                  placeholder="Search users (at least 2 characters)"
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
                    ? searchResult.map((user) => 
                      <li key={user.id}>  
                      <p> <Avatar size={30} src={user.avatar} radius={30} /> {user.first_name} {user.last_name} {user.email} <Button className="addUser" p={10} ml={10} onClick={() => addUser(user)}> Add </Button></p>
                      </li>)
                    : ""}
                </ul>
                <ErrorMessage message={errorMessage} style={errorStyle} />
                </div>
            </>
          );
        };