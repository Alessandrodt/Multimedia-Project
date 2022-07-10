// React
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {NavbarGroups} from "../navbar-groups/NavbarGroups"

// Components
import { Gallery } from "../../galleries/Gallery";

// Translation
import { t } from "i18next";

export const NotOwnedGroupFolders = () =>  {
    const { folderId, groupId } = useParams();
    const user = JSON.parse(sessionStorage.getItem("user"));
    return (
        <>
        <NavbarGroups></NavbarGroups>
            <section className="folder-gallery">
                <Gallery
                folderId={folderId}
                key={folderId}
                >
                </Gallery>
                <div className="back">
                    <Link to={`/users/${user.id}/groups/${groupId}/shared`}>
                    <span>{t("group_back")}</span>
                    </Link>
                </div>
          </section>
        </>
    )
}
