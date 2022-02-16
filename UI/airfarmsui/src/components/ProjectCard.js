import React from 'react'
import {
    Text,
    VStack,
    Box,
    useColorModeValue
} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

function ProjectCard(props) {

    return (
        
            <Link to={{
                pathname: "/load-project",
                state: { projectID: props.projectBody.id },
              }}>
                <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                borderWidth='1px'>
                    <VStack>
                        <Text noOfLines={1}>{props.projectBody.title}</Text>
                        <Text noOfLines={3}>{props.projectBody.notes}</Text>  
                    </VStack>
                </Box>                                 
            </Link>

    )
}

export default ProjectCard
