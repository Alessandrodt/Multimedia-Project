export function Card({ size, img }) {
  const styles = {
    card: {
      margin: "10px 10px",
      padding: 0,
      borderRadius: "16px",
    },
  };

  const detailComponent = () => {
    console.log("make this component pls");
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
