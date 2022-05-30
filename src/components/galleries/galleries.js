import React from 'react';
import './Galleries.css'
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme } from '@mantine/core';

const PRIMARY_COL_HEIGHT = 300;


export function Galleries() {
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

      return (
       <div>
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
                    <Skeleton className='box' height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col className='vertical' span={6}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                    <Skeleton className='smalbox' height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
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

                <Grid gutter="md">
                <Grid.Col span={6}>
                    <Skeleton className='box' height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton className='box' height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                </Grid.Col>
                </Grid>
                <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
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
            </SimpleGrid>
            </Container>
       </div>
            
      
      );
  }