import { Card } from "../card/Card"

export function HomeGallery() {
    const styles = {
        container: {
            margin: 0,
            padding: 0,
            width: '90vw',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 250px)',
            gridAutoRows: '10px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            justifyContent: 'center',
        }
    }

    return (
        <div style={styles.container}>
            <Card size='small' />
            <Card size='medium' />
            <Card size='large' /> 
            <Card size='small' />
            <Card size='medium' />
            <Card size='large' /> 
            <Card size='small' />
            <Card size='medium' />
            <Card size='large' /> 
            <Card size='small' />
            <Card size='medium' />
            <Card size='small' /> 
        </div>
    )
}