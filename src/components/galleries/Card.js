export function Card(props) {
    const styles = {
        card: {
            margin: '10px 10px',
            padding: 0,
            borderRadius: '16px',
            backgroundColor: 'grey'
        },
        small: {
            gridRowEnd: 'span 26'
        },
        medium: {
            gridRowEnd: 'span 33'
        },
        large: {
            gridRowEnd: 'span 45'
        }
    }

    return (
        <div style={{
            ...styles.card,
            ...styles[props.size]
        }}>
        </div>
    )
}
