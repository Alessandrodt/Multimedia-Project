import { useEffect, useState } from "react";

// Services imports
import groupsServices from "../../services/groupsServices";

// Mantine imports
import { Avatar, Button, Card, SimpleGrid, TextInput } from '@mantine/core';
import { useModals } from '@mantine/modals';

// Components imports
import defaultAvatar from '../../images/user.svg';
import { ErrorMessage } from "../error-message/ErrorMessage";
import { GroupContainer } from "./GroupContainer";
import { NavbarGroups } from "./navbar-groups/NavbarGroups";

export const Groups = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');

    // Message handling section.
    const [color, setColor] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const errorStyle = {
      color: color,
      fontSize: "18px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginTop: "10px",
      marginBottom: "15px",
      width: "30%",
    };

    const handleMessage = (color, message) => {
        setColor(color);
        setErrorMessage(message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
    };
    // End of message handling section.

    // Conditional welcome message, checking the length of the groups state.
    const initialMessage = groups.length 
    ? <h4> These are your groups! </h4>
    : <h4> It seems you have no groups... why don't you create one? </h4>

    // useEffect hook, on page load all the groups created by the user are retrieved from the server.
    useEffect(() => {
        groupsServices.getUserGroups(user.id)
        .then(groups => {
            console.log('Groups Loaded');
            console.log(groups.data)
            setGroups(groups.data);
        })
        .catch(err => {
            if (err.response.status === 401) {
                handleMessage('red','You appear to not be logged in. Please refresh the page and authenticate yourself.');
            };
        });
    }, [user.id]);

    // groupName handler.
    const handleChange = (event) => {
        setGroupName(event.target.value);
    }

    // Function to open the Create Group modal.
    const groupForm = 
    <Card className="wrapper-group">
     <form onSubmit={(e) => {
      e.preventDefault();
      createGroup()
     }}>
     <TextInput 
      defaultValue={groupName}
      label='Choose a title!'
      name='groupName'
      onChange={handleChange}
      placeholder='Your title here'
      required
    />
    <Button fullWidth type="submit"> Create Group </Button>
    </form>
 </Card>

    // Object sent to the backend in the createGroup function
    const newGroup = {
        name: groupName,
    }
    
    // Function responsible for adding a group.
    const createGroup = () => {
        const existingGroup = groups.find(g => g.name === groupName);

        if (existingGroup) {
            handleMessage('yellow', `A group named ${groupName} already exists!`)
        } else {
            groupsServices.createGroup(user.id, newGroup)
            .then(res => {
                setGroups(groups.concat(res.data));
                setGroupName('');
            })
            .catch(err => {
                if (err.response.status === 401) {
                    handleMessage('red','You appear to not be logged in. Please authenticate yourself.');
                } else {
                    handleMessage('blue','Group name must be at least 3 characters long!');
                    console.log(err.message)
                }
            })
        }
    }

    return (
        <main className="wrapper-create-group">
            <NavbarGroups/>
            <section className="wrapper-group-box">
                <h3> GROUPS </h3>
                {initialMessage}
                <Avatar className="group-avatar" src={user?.avatar?.name ? `http://smear-backend.test//images/avatars/${user?.avatar?.name}` : defaultAvatar } size={150} />
                {groupForm}
                <ErrorMessage message={errorMessage} style={errorStyle} />
                {/* A map to create a list item for each group name */}
                <SimpleGrid className="wrapper-grid" cols={3} spacing='md'>
                {groups.map(group =>
                <GroupContainer key={group.name} groupName={group.name} groupDetails={`/users/${user.id}/groups/${group.id}/details`} groupSharing={`/users/${user.id}/groups/${group.id}/share`} />
                )}
                </SimpleGrid>
            </section>
        </main>
    )
};