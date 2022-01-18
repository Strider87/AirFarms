import React from 'react'
import MapContainer from '../components/MapContainer'
import {Box} from '@chakra-ui/react'

function NewFarm() {
    return (
        <Box 
        display='flex' 
        p='3' 
        maxW='bg' 
        alignItems='top' 
        height='600px' 
        borderWidth="2px" 
        borderRadius="lg"
        ml='2'
        mr='2'
        >            
            <MapContainer/>
        </Box>
    )
}

export default NewFarm
