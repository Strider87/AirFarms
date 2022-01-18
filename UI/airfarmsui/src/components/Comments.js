import React from 'react'
import parse from "html-react-parser"
import {useSelector} from 'react-redux'
import {
    Text,
    Divider,
    Flex,
    Avatar,
    Stack,
    VStack,
    Box
} from '@chakra-ui/react'

function Comments(props) {
    const locale = 'en';
    const user = useSelector(state => state.getUser)
    const date = new Date(props.postBody.comment_date)
    //const [dateString, timeString, wish] = useDate(date)
    const day = date.toLocaleDateString(locale, { weekday: 'long' });
    const dateString = `${day}, ${date.getDate()} ${date.toLocaleDateString(locale, { month: 'long' })}\n\n`;
  
    const hour = date.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;
  
    const time = date.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
    //const dateString = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date)
    return (
        
            <Flex>
                <Stack direction="row">
                    <Avatar
                        size={'sm'}
                        src={
                            user.picture
                        }
                        alt={'Author'}
                        css={{
                            border: '2px solid white',
                        }}
                        />
                    <Divider orientation="vertical" />
                    <Box>
                        <VStack>
                            <Text>{parse(props.postBody.comment)}</Text> 
                            <br/> 
                        </VStack>
                        {dateString === null ? <Text ml="2" fontSize="xs">Just now</Text> : <Text ml="2" fontSize="xs">{dateString}, {time}</Text>}
                    </Box>                  
                </Stack>                
            </Flex>

    )
}

export default Comments
