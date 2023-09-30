import { useQuery } from '@apollo/client';
import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { GET_CHARACTER } from '../graphql/queries';
import Loading from './Loading';
import Error from './Error';
import { ArrowBack, BackHand, BackHandRounded } from '@mui/icons-material';

export default function Character() {
    const params = useParams()
    const { loading, data, error } = useQuery(GET_CHARACTER, {
        variables: { id: params.id }
    });

    if (loading) {
        return <Loading />
    };

    if (error) {
        return <Error />
    };
    return (

        <Container sx={{ py: '100px' }}>
            <Link to={'/'} style={{ background: 'rgb(60, 62, 68)', color: 'white', display: 'flex', justifyContent: 'center', width: '60px', height: '40px', alignItems: 'center', borderRadius: '6px', marginBottom: '20px' }}>
                <ArrowBack />
            </Link>
            <Stack padding={'30px'} mx={'auto'} color={'white'} borderRadius={'10px'} direction={'column'} flexWrap={'wrap'} bgcolor={'rgb(60, 62, 68)'} >
                <img src={data?.character?.image} style={{ borderRadius: '10px' }} alt="" />
                <Box sx={{ p: 3 }}>
                    <Typography variant='h1'>
                        {data?.character.name}
                    </Typography>

                    <Stack direction={'row'} py={1} justifyContent={'start'} alignItems={'center'}>
                        <Box height={'14px'} width={'14px'} sx={{ borderRadius: '100%', mr: '10px' }} bgcolor={data?.character.status == 'Dead' ? 'rgb(214, 61, 46)' : '' || data?.character.status == 'unknown' ? '#abb2bf' : '' || data?.character.status == 'Alive' ? 'rgb(85, 204, 68)' : ''}></Box>
                        <Typography variant="h3">
                            {data?.character.status}
                        </Typography>
                    </Stack>

                    <Typography variant="h3" color={'rgb(158, 158, 158)'}>
                        Last known location:
                    </Typography>
                    <Typography variant="h3" py={2} >
                        {
                            data?.character.location.name
                        }
                    </Typography>

                    <Typography variant="h3" color={'rgb(158, 158, 158)'}>
                        Gender:
                    </Typography>
                    <Typography variant="h3" py={2} >
                        {
                            data?.character.gender
                        }
                    </Typography>

                    <Typography variant="h3" color={'rgb(158, 158, 158)'}>
                        Species:
                    </Typography>
                    <Typography variant="h3" py={2} >
                        {
                            data?.character.species
                        }
                    </Typography>
                </Box>
            </Stack>
        </Container>

    )
}
