import React from 'react'
import NavBar from '../components/NavBar'
import {
    GridItem,
    Grid
} from '@chakra-ui/react'
import MessageBoardRich from '../tools/MessageBoardRich'


function UserDashboard() {
    return (
        <>
            <NavBar/>
            <Grid
            h="600px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
            >
                <GridItem rowSpan={2} colSpan={1} bg="tomato"></GridItem>
                <GridItem colSpan={3} ><MessageBoardRich post_id={9} /></GridItem>
            </Grid>
        </>
    )
}

export default UserDashboard
