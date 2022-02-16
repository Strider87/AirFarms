import React from 'react';
import NewTask from '../forms/NewTask';
import {
    VStack,
    Box,
    Portal,
    useColorModeValue,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

function CreateTaskCard(props) {
    return (
        <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                rounded={'md'}
                overflow={'hidden'}
                borderWidth='3px'
                borderStyle="dotted">
                    <VStack>
                        <Popover>
                        <PopoverTrigger>
                            <AddIcon
                            ml="10px"
                            mr="10px"
                            mt="10px"
                            mb="10px"
                            h={'140px'}
                            w={'full'}
                            overflow={'hidden'}
                            />
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>Add a task</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                                <NewTask todoID={props.todo}/>
                            </PopoverBody>
                            </PopoverContent>
                        </Portal>
                        </Popover>
                        
                    </VStack>
                </Box> 
    )
}

export default CreateTaskCard;
