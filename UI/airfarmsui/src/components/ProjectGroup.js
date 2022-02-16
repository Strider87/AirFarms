import React from 'react';
import {
    Box,
    HStack,
    Text
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import {Link} from 'react-router-dom'

function ProjectGroup(props) {
  return (
  
    <Link to={{
        pathname: "/load-projectlist",
        state: { farmID: props.farm },
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
            <Text noOfLines={1}>Projects</Text>  
            <EmailIcon/>
        </HStack>
    </Box>
    </Link>
  )
}

export default ProjectGroup;


