export function Card({size, img}) {
    const styles = {
        card: {
            margin: '10px 10px',
            padding: 0,
            borderRadius: '16px',
        },
        small: {
            gridRowEnd: 'span 100'
        },
        medium: {
            gridRowEnd: 'span 25'
        },
        large: {
            gridRowEnd: 'span 26'
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
