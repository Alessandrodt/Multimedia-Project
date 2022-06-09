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
import { Search } from 'tabler-icons-react';

import { useModals } from '@mantine/modals';

export const GroupsDetails = () => {
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
    {
      avatar: "pic.png",
      name: "Chiara Gobbi",
      email: "testemail@gmail.com",
    },
  ];

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isReadonly, setIsReadonly] = useState(true);


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
      modals.openModal({
        title: 'Warning!',
        centered: true,
        children: (
        <Text size="sm">
          This user already exists in the group.
        </Text>)
      })
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

  const openDeleteModal = (user) =>
    modals.openConfirmModal({
      title: 'Delete user?',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete {user.name} from the group? You will be able to add them again.
        </Text>
      ),
      labels: { confirm: 'Delete user', cancel: "Cancel" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteUser(user),
    });


  const rows = groups.map((user) => (
    <tr>
      <td key={user.name}>
        <Group spacing="sm">
          <Avatar size={30} src={user.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {user.name}
          </Text>
          <Text size="sm" weight={500}>
            {user.email}
          </Text>
          <Button onClick={() => openDeleteModal(user)}> Delete </Button>
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
            <input type="text" readOnly={isReadonly} /* onInput={e => setValue(e)} value={username} *//>
            
              <Button ml={10} mr={10} onClick={() => setIsReadonly(prevState => !prevState)}> Modify group name</Button>
               <Button ml={10} onClick={() => setGroup(setGroup => !setGroup)  }> Delete group </Button>
            </tr>
          </thead>
          <tbody>
            {rows}
            <tr>
              <Text>
                <Input
                  icon={<Search size={20} />}
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
                      <p> <Avatar size={30} src={user.avatar} radius={30} /> {user.name} </p> <Button p={10} ml={10} onClick={() => addUser(user)}> Add </Button>
                      </li>)
                    : ""}
                </ul>
              </Text>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
};
