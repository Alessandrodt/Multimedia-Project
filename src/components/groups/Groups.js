import { useEffect, useState } from "react";

// Services imports
import groupsServices from "../../services/groupsServices";

// Mantine imports
import { Button, TextInput } from '@mantine/core';

export const Groups = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');

    // Conditional welcome message, checking the length of the groups state.
    const initialMessage = groups.length 
    ? <h2> These are your groups! </h2>
    : <h2> It seems you have no groups... why don't you create one? </h2>

    // useEffect hook, on page load all the grups created by the user are retrieved from the server.
    useEffect(() => {
        groupsServices.getUserGroups(user.id)
        .then(groups => {
            console.log('Groups Loaded');
            setGroups(groups.data);
        })
        .catch(err => {
            if (err.response.status === 401) {
                console.log('You appear to not be logged in. Please refresh the page and authenticate yourself.');
            };
        });
    });

    // groupName handler.
    const handleChange = (event) => {
        setGroupName(event.target.value);
        console.log(groupName);
    }

    // Function to open the Create Group modal.
    const groupForm = 
        <form onSubmit={(e) => {
        e.preventDefault();
        createGroup()
        }
        }>
        <TextInput 
            label='Choose a title!'
            placeholder='Your title here'
            required
            name='groupName'
            onChange={handleChange}
            defaultValue={groupName}
        />
        <Button fullWidth type="submit"> Create Group </Button>
    </form>
      

    // Object sent to the backend in the createGroup function
    const newGroup = {
        name: groupName,
    }
    
    // Function responsible for adding a group.
    const createGroup = () => {
        groupsServices.createGroup(user.id, newGroup)
        .then(res => {
            setGroups(groups.concat(res.data))
            console.log('Group was created')
        })
        .catch(err => {
            if (err.response.status === 401) {
                console.log('You appear to not be logged in. Please authenticate yourself.');
            } else {
                console.log('There was an error creating the group');
                console.log(err.message)
            }
        })
    }

    return (
        <>
         <h1> GROUPS </h1>
         {initialMessage}
         {groupForm}
            {/* A map to create a list item for each group name */}
            <ul>
                {groups.map(group =>
                    <>
                        <li key={group.name}> {group.name} </li>
                        <Button key={group.id} onClick={() => alert(`This should delete ${group.name} but backend isn't ready yet`)}> Delete </Button>
                    </>
                )}
            </ul>
        </>
    )
};

