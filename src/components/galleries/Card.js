//components
import { DetailImg } from "../detail-img/DetailImg";
//libraries
import { useModals } from "@mantine/modals";

export function Card({ img, idImage }) {
  const modals = useModals();

  const styles = {
    card: {
      margin: "10px 10px",
      padding: 0,
      borderRadius: "16px",
    },
  };

  const detailComponent = () => {
    modals.openModal({
      centered: true,
      closeOnClickOutside: false,
      children: <DetailImg idImage={idImage} />,
      overflow: "outside",
      size: "70%",
    });
  };

  return (
    <img
      src={img}
      alt="random images"
      style={{ ...styles.card }}
      onClick={detailComponent}
    />
  );
}
