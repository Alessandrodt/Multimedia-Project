//components
import { DetailImg } from "./DetailImg";
//libraries
import { useModals } from "@mantine/modals";

export function Card({ img, idImage }) {
  const modals = useModals();

  const styles = {
    margin: "10px 10px",
    padding: 0,
    borderRadius: "16px",
    // added not to break everything
    display: "block",
    width: "100%",
  };

  const detailComponent = () => {
    modals.openModal({
      centered: true,
      closeOnClickOutside: false,
      children: <DetailImg idImage={idImage} />,
      overflow: "inside",
      size: "70%",
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
