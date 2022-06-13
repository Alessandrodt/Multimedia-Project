import { DettaglioImg } from "../dettaglio-img/DettaglioImg";
import { useModals } from "@mantine/modals";

export function Card({size, img}) {
    const styles = {
        card: {
            margin: '10px 10px',
            padding: 0,
            borderRadius: '16px',
        },
        small: {
        },
        medium: {
        },
        large: {
        },

    }


 const modals = useModals();

    const detailComponent = () => {
        console.log(    
            modals.openModal( {
            children: <DettaglioImg />,
          }))
    }

    return (
            <img src={img} alt="random images" style={{
                    ...styles.card,
                    ...styles[size]
                }} onClick={detailComponent} />
    )
}
