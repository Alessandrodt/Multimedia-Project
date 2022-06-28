import { useState } from "react";

import { AddFolderModal } from "./AddFolderModal";

export const GroupSharing = () => {
    const [sharedFolders, setSharedFolders] = useState([]);
    
    return (
        <>
        <h1> GROUP IMAGE SHARING </h1>
            <AddFolderModal sharedFolders={sharedFolders} setSharedFolders={setSharedFolders} />
            <h3> This is the section where you should see if a folder is added or not but we don't have the facilities for this </h3>
            <ul> 
                {sharedFolders?.map(sharedFolder => {
                    return (
                        <li key={sharedFolder.id} >
                            {sharedFolder.name}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}