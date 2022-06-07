export function Card({size, img}) {
    const styles = {
        card: {
            margin: '10px 10px',
            padding: 0,
            borderRadius: '16px',
        },
        small: {
            gridRowEnd: 'span 10'
        },
        medium: {
            gridRowEnd: 'span 25'
        },
        large: {
            gridRowEnd: 'span 26'
        }
    }

    return (
    <img src={img} alt="random images" style={{
            ...styles.card,
            ...styles[size]
        }} width="90%"/>
    )
}
