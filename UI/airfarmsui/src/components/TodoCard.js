import React from 'react';
import {
    Box,
    HStack,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import {Link} from 'react-router-dom'

function TodoCard(props) {
  return (
  
    <Link to={{
        pathname: "/todo",
        state: { todoID: props.todo.id },
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
            <Text noOfLines={1}>Todo</Text>  
            <EmailIcon/>
        </HStack>
    </Box>
    </Link> 
  )
}

export default TodoCard;


