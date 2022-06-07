import React, { useState } from "react";
import {
  Avatar,
  Table,
  Group,
  Text,
  ScrollArea,
  Button,
  Input,
} from "@mantine/core";

import { useModals } from '@mantine/modals';

export const Groups = () => {
  const [groups, setGroup] = useState([
    {
      avatar: "pic.png",
      name: "Alberto Mastromonaco",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Alessandro Catucci",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Alessandro De Tommasi",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Arianna Poverini",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Gerardo De Blasio",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Johanna Sonsini",
      email: "testemail@gmail.com",
    },
  ]);

  const notGroupPeople = [
    {
      avatar: "pic.png",
      name: "Adelina Darie",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Omar Habib",
      email: "testemail@gmail.com",
    },
  ];
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    let searchUsers = notGroupPeople.filter((user) => {
      return e.target.value !== "" && user.name.includes(e.target.value);
    });
    setSearchResult(searchUsers);
  };

  const addUser = (user) => {
    const existingUser = groups.find(u => u.name === user.name);

    if (existingUser) {
      alert(`${user.name} is already in the group!`)
    } else {
      const updatedGroup = groups.concat(user);
      setSearchInput("");
      setSearchResult("");
      setGroup(updatedGroup);
    }
  }

  // REMEMBER TO ADD THE DELETE USER FROM GROUP WHEN BACKEND IS READY
  const deleteUser = (user) => {
    let filteredGroup = groups.filter((u) => u.name !== user.name);
     setGroup(filteredGroup);
  };

  const modals = useModals();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete user?',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this user from the group? You will be able to add them again.
        </Text>
      ),
      labels: { confirm: 'Delete user', cancel: "Cancel" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteUser(),
    });


  const rows = groups.map((user) => (
    <tr key={user.name}>
      <td key={user.name}>
        <Group spacing="sm">
          <Avatar size={30} src={user.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {user.name}
          </Text>
          <Text size="sm" weight={500}>
            {user.email}
          </Text>
          <Button onClick={() => openDeleteModal()}> Delete </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <ScrollArea>
        <Table sx={{ maxHeight: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th> Group 1 </th>
            </tr>
          </thead>
          <tbody>
            {rows}
            <tr>
              <Text>
                <Input
                  placeholder="Add an user"
                  value={searchInput}
                  onChange={handleSearch}
                />
                <ul
                  style={
                    searchResult.length === 0
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {searchResult.length > 0
                    ? searchResult.map((user) => 
                      <li key={user.name}>  
                        <Avatar size={30} src={user.avatar} radius={30} /> {user.name} <Button onClick={() => addUser(user)}> Add </Button>
                      </li>)
                    : ""}
                </ul>
              </Text>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
      <div>
        <p> Test for the ScrollArea </p>
      </div>
    </>
  );
};
