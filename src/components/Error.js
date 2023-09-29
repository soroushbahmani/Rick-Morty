import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Error({message}) {
    return (
        <Box width={'100vw'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography color={'orange'} variant="h1">
                {message}
            </Typography>
        </Box>
    )
}
