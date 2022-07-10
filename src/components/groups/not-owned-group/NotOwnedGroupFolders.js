// React
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {NavbarGroups} from "../navbar-groups/NavbarGroups"

// Components
import { Gallery } from "../../galleries/Gallery";

// Translation
import { t } from "i18next";
import { Navbar } from "@mantine/core";

export const NotOwnedGroupFolders = () =>  {
    const { folderId, groupid } = useParams();
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
                    <Link to={`/users/${user.id}/groups/${groupid}/shared`}>
                    <span>{t("group_back")}</span>
                    </Link>
                </div>
          </section>
        </>
    )
}
