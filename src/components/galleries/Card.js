// Components
import { DetailImg } from "./DetailImg";

//Libraries
import { useModals } from "@mantine/modals";

export function Card({ img, idImage }) {
  const modals = useModals();

  const styles = {
    //borderRadius: "20px",
    // added not to break everything
    display: "block",
    width: "100%",
  };

  const detailComponent = () => {
    modals.openModal({
      centered: true,
      closeOnClickOutside: false,
      children: <DetailImg idImage={idImage} />,
      size: "50%",
    });
  };

  return (
    <img
      src={img.includes("static") ? img : "data:image/png;base64, " + img}
      alt="images"
      style={{ ...styles }}
      onClick={detailComponent}
    />
  );
}
