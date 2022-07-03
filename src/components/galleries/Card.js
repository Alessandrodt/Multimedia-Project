export function Card({ img }) {
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
      src={img.includes("static") ? img : "data:image/png;base64, " + img}
      alt="random images"
      style={{ ...styles.card }}
      onClick={detailComponent}
    />
  );
}
