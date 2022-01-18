import React from 'react'
import NavBar from '../components/NavBar'
import {
    GridItem,
    Grid
} from '@chakra-ui/react'
import DiscussionBoard from '../tools/DiscussionBoard'
import LocationProvider from '../utils/LocationProvider'


function UserDashboard() {
    return (
        <>
            <NavBar/>
            <LocationProvider currentLocation={true}/>
            <Grid
            h="600px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
            >
                <GridItem rowSpan={2} colSpan={1} bg="tomato"></GridItem>
                <GridItem colSpan={3} ><DiscussionBoard discussion_id={1} /></GridItem>
            </Grid>
        </>
    )
}

export default UserDashboard
