import React from 'react'
import parse from "html-react-parser"
import {useSelector} from 'react-redux'
import {
    Text,
    Flex,
    VStack,
    Box,
    Image,
    useColorModeValue
} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'

function CreateFarmCard(props) {
    const locale = 'en';
    const user = useSelector(state => state.getUser)
    // const date = new Date(props.postBody.date_posted)
    // //const [dateString, timeString, wish] = useDate(date)
    // const day = date.toLocaleDateString(locale, { weekday: 'long' });
    // const dateString = `${day}, ${date.getDate()} ${date.toLocaleDateString(locale, { month: 'long' })}\n\n`;
  
    // const hour = date.getHours();
    // const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;
  
    // const time = date.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
    //const dateString = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date)
    return (
        
            <Link to="/create-farm">
                <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                rounded={'md'}
                overflow={'hidden'}
                borderWidth='3px'
                borderStyle="dotted">
                    <VStack>
                        <AddIcon
                        ml="10px"
                        mr="10px"
                        mt="10px"
                        mb="10px"
                        h={'140px'}
                        w={'full'}
                        overflow={'hidden'}
                        />
                    </VStack>
                </Box>                                 
            </Link>

    )
}

export default CreateFarmCard
