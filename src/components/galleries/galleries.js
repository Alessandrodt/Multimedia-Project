import React from 'react';
import './galleries.css'
import { useState} from 'react';
import { useEffect } from 'react';
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme } from '@mantine/core';

const PRIMARY_COL_HEIGHT = 300;


export function Galleries() {
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
  
    // Nota: l'array deps vuoto [] significa
    // questo useEffect verrà eseguito una volta
    // simile a componentDidMount()
    useEffect(() => {
      fetch("https:api.unsplash.com/photos/?client_id=kankGjIoYLEQFbI2nB5Kx6ttarx4NkQ0jOVIuiv14Pc")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Nota: è importante gestire gli errori qui
          // invece di un blocco catch() in modo da non fare passare
          // eccezioni da bug reali nei componenti.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

      return (
       <div>
           <img src='{items}'></img>
           <Container my="md">
            <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
                <Grid gutter="md">
                <Grid.Col>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                </Grid>
                <Grid gutter="md">
                <Grid.Col span={6}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                </Grid>
                <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
                <Grid gutter="md">
                <Grid.Col>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
        
                </Grid>
                <Grid gutter="md">
                <Grid.Col span={6}>
                    <Skeleton className='box' height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton className='box' height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                </Grid>
            </SimpleGrid>
            </Container>
       </div>
            
      
      );
  }