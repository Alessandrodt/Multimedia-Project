 import { Button } from "@mantine/core";
import React, { useState } from "react";
// import {
//   Avatar,
//   Table,
//   Group,
//   Text,
//   ScrollArea,
//   Button,
//   Input,
// } from "@mantine/core";
 
export const Groups = () => {


    return (
        <>
        <div className="wrapper-groups">
        <h2>
            This is all your groups!
        </h2>
        <Button mt={10}> Create a new group </Button>
        {/* chiamata al backend richiamando solo avatar gruppo(?) e nome del gruppo */}
        </div>
        </>
    
    )
};

