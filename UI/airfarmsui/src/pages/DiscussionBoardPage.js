import React from 'react';
import NavBar from '../components/NavBar'
import { useLocation } from "react-router-dom"
import {
    Grid,
    GridItem,
    Stack,
    Skeleton
} from '@chakra-ui/react'
import DiscussionBoard from '../tools/DiscussionBoard';

function DiscussionBoardPage() {
    const location = useLocation()
    const discussion = location.state?.discussionID

  return (
    <>
        <NavBar/>
        <Grid
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={1}
            >
                <GridItem rowSpan={5} colSpan={1}></GridItem>
                <GridItem rowSpan={5} colSpan={1}>{discussion !== undefined ? <DiscussionBoard discussion_id={discussion}/>: <Stack>
                                                            <Skeleton height='20px' />
                                                            <Skeleton height='20px' />
                                                            <Skeleton height='20px' />
                                                        </Stack>} 
                </GridItem>
                <GridItem rowSpan={5} colSpan={1}></GridItem>
        </Grid>
    </>
  )
}

export default DiscussionBoardPage;
