//components
import { DetailImg } from "./DetailImg";
//libraries
import { useModals } from "@mantine/modals";

export function Card({ img, idImage }) {
  const modals = useModals();

  const styles = {
    //padding: "10px",
    borderRadius: "20px",
    // added not to break everything
    width: "100%",
  };

  const detailComponent = () => {
    modals.openModal({
      centered: true,
      closeOnClickOutside: false,
      children: <DetailImg idImage={idImage} />,
      overflow: "inside",
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
