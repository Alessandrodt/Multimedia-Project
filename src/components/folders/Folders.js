import folder from '../../images/add-folder.svg'

export const Folders = () => {

    return (
        <>
            <h2>
                folder img!
            </h2>

            <div className="wrapper-folders">
                <div className="folder">
                    <span>
                        <img src={folder} title="add folder" alt="create a new folder" />
                    </span>
                </div>
            </div>
        </>
    
    )
};