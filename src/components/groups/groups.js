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

export const Groups = () => {
  const [groups, setGroup] = useState([
    {
      avatar: "pic.png",
      name: "Alberto",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Alessandro",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Alessandro2",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Arianna",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Gerardo",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Johanna",
      email: "testemail@gmail.com",
    },
  ]);

  const notGroupPeople = [
    {
      avatar: "pic.png",
      name: "Adelina",
      email: "testemail@gmail.com",
    },
    {
      avatar: "pic.png",
      name: "Omar",
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

  // REMEMBER TO ADD THE DELETE USER FROM GROUP WHEN BACKEND IS READY
  const deleteUser = (user) => {
    let filteredGroup = groups.filter((u) => u.name !== user.name);
    setGroup(filteredGroup);
  };

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
          <Button onClick={() => deleteUser(user)}> Delete </Button>
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
                    ? searchResult.map((u) => <li key={u.name}>{u.name}</li>)
                    : ""}
                </ul>
              </Text>
              <Button> Add </Button>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
      <div>
        <p> Test for the ScrollArea</p>
      </div>
    </>
  );
};
