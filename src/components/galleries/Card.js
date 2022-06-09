export function Card({size, img}) {
    const styles = {
        card: {
            margin: '10px 10px',
            padding: 0,
            borderRadius: '16px',
        },
        small: {
            // gridRowEnd: 'span 26'
        },
        medium: {
            // gridRowEnd: 'span 33'
        },
        large: {
            // gridRowEnd: 'span 45'
        }
    }

    const detailComponent = () => {
        console.log("make this component pls")
    }

    return (
            <img src={img} alt="random images" style={{
                    ...styles.card,
                    ...styles[size]
                }} width="90%" onClick={detailComponent} />
    )
}
