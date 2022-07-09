// React
import { useParams } from "react-router-dom";

// Components
import { Gallery } from "../../galleries/Gallery";

export const NotOwnedGroupFolders = () =>  {
    const { folderId } = useParams();
    return (
        <>
            <section className="folder-gallery">
                <Gallery
                folderId={folderId}
                key={folderId}
                >
                </Gallery>
          </section>
        </>
    )
}
