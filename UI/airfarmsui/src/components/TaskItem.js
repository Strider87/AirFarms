import { 
    Box,
    Text,
    Divider
 } from '@chakra-ui/react';
import React from 'react';
import {Link} from 'react-router-dom'

function TaskItem(props) {
    const locale = 'en';
    const date = new Date(props.taskBody.completion_date)
    const day = date.toLocaleDateString(locale, { weekday: 'long' });
    const dateString = `${day}, ${date.getDate()} ${date.toLocaleDateString(locale, { month: 'long' })}\n\n`;
    return (
        <Link to={{
            pathname: "/load-task",
            state: { task: props.taskBody },
          }}>
              <Box
              borderWidth='1px' 
              borderRadius='lg' 
              overflow='hidden'
              >
                  <Text fontSize='xl'>{props.taskBody.title}</Text>
                  <Divider orientation='horizontal' />
                  <Text fontSize='md'>{props.taskBody.notes}</Text>
                  <Divider orientation='horizontal' />
                  <Text fontSize='md'>{dateString}</Text>
              </Box>
        </Link>
    )
}

export default TaskItem;
