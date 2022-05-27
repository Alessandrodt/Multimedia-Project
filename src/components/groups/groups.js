import React from 'react';
import {
  Avatar,
  Table,
  Group,
  Text,
  ScrollArea,
} from '@mantine/core';

const data = [
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
    name: "Alessandro",
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
];

export const Groups = () => {
  const rows = data.map((item) => (
    <>
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {item.name}
          </Text>
          <Text size="sm" weight={500}>
            {item.email}
          </Text>
        </Group>
      </td>
    </tr>
    </>
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
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
        <div>
            <p> Test for the ScrollArea</p>
        </div>
    </>
  );
}