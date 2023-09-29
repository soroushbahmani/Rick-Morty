import React from 'react'
import '../App.css'
import { Box } from '@mui/material'

export default function Loading() {
    return (
        <Box py={'100px'} width={'100vw'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
            <div className="lds-dual-ring"></div>
        </Box>
    )
}
