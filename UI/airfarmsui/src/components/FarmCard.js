import React from 'react'
import parse from "html-react-parser"
import {useSelector} from 'react-redux'
import {
    Text,
    VStack,
    Box,
    Image,
    useColorModeValue
} from '@chakra-ui/react'

function FarmCard(props) {
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
        
            <>
                <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                borderWidth='1px'>
                    <VStack>
                        <Text noOfLines={1}>{props.farmBody.farm.description}</Text> 
                        <br/> 
                        <Image 
                        h={'120px'}
                        w={'full'}
                        src={props.farmBody.farmpicture.image}
                        objectFit={'cover'} />
                    </VStack>
                </Box>                                 
            </>

    )
}

export default FarmCard
