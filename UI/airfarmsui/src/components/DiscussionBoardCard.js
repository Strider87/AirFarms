import React from 'react';
import {
    Box,
    HStack,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import {Link} from 'react-router-dom'

function DiscussionBoardCard(props) {
  return (
  
    <Link to={{
        pathname: "/discussion-board",
        state: { discussionID: props.discussion },
      }}>
    <Box
        display='flex' 
        p='3' 
        maxW='bg'   
        borderWidth="2px" 
        borderRadius="lg"
        ml='2'
        mr='2'>
        <HStack align='center'>
            <Text noOfLines={1}>{props.title}</Text>  
            <EmailIcon/>
        </HStack>
    </Box>
    </Link> 
  )
}

export default DiscussionBoardCard;


