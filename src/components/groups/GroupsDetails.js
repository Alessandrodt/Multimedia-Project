import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Avatar,
  Group,
  Text,
  Button,
  Input,
} from "@mantine/core";

import toast from "react-hot-toast";

import { Search } from 'tabler-icons-react';
import { useParams } from "react-router-dom";

import { useModals } from '@mantine/modals';

import groupsServices from "../../services/groupsServices";

import { NavbarGroups } from "./navbar-groups/NavbarGroups";

import add from "../../images/add.svg"

export const GroupsDetails = () => {
  const { groupId } = useParams();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [group, setGroup] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // Searches users in the database by their email to add them to the group.
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  }
  const search = searchInput;

  useEffect(() => {
    if (search !== "" && search.length >= 2) {
      groupsServices.searchUser(search)
      .then(searchResult => {
        setSearchResult(searchResult.data.filter(u => u.email.toLowerCase().includes(search)));
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
      toast.success(`${user.first_name} ${user.last_name} is now part of the group!`);
    })
    .catch(err => {
      if (err.response.status === 422) {
        toast.error("This user is already in the group!")
      }
    })
  };
  
    // Deletes the user of choice from the group by their ID.
    const deleteUser = (user) => {
      groupsServices.deleteUser(groupId, user.id)
      .then(res => {
      setGroup(group.filter((u) => u.id !== user.id));
      toast.success(`${user.first_name} ${user.last_name} has been deleted from the group.`)
    })
    .catch(err => {
      if (err.response.status === 403) {
        toast.error("You don't own this group so you don't have the authorization to remove this user, or you are trying to remove yourself, which can't be done.")
      }
    })
    .catch(err => {
      if (err.response.status === 404) {
        toast.error("red", "Group or user not found.")
      }
    })
  };
  
  //  Loads all the users in the selected group.
  useEffect(() => {
    groupsServices.getUserGroups(user.id)
    .then(groups => {
      groups.data.map(item => item.users);
      const i = groups.data.findIndex(item => item.id == groupId);
      setGroup((groups.data[i].users || [])); 
    })
  }, [user.id]);


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
        </Group>
        <Button className="deleteUser" color="red" onClick={() => openDeleteModal(user)}> Delete </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <NavbarGroups></NavbarGroups>
      <section className="wrapper-group-details">
        <table className="wrapper-table " style={
          group.length === 0
          ? { opacity : 0}
          : { opacity : 1}}>
          <tbody> {rows} </tbody>
        </table>
        <div className="box-src-group">
          <div className="searchText">
          Aggiungi un utente
          </div>
          <div className="search-box-group">
            <Input
              icon={<Search size={20} />}
              placeholder="Search users (at least 2 characters)"
              defaultValue={searchInput}
              onChange={handleSearch}
            />
          </div>
          <ul
            style={searchResult.length === 0 ? { display: "none" } : { display: "block" }}>
            {searchResult.length > 0 ? searchResult.map((user) => 
            <li key={user.id}>  
              <span><Avatar size={30} src={user.avatar} radius={30} /> <p>{user.first_name} {user.last_name}</p></span> <span>{user.email}</span> <Button className="addUser" p={10} ml={10} onClick={() => addUser(user)}>
                <img src={add}></img>
              </Button>
            </li>) : ""}
          </ul>
          <div className="back">
          <Link to={`/users/${user.id}/groups`}>
              <span>
               Indietro
                </span>
            </Link>
        </div>
        </div>
      </section>
    </>
  );
};
