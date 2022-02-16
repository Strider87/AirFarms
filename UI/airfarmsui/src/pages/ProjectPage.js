import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom"
import DiscussionBoardCard from '../components/DiscussionBoardCard'
import NavBar from '../components/NavBar'
import {AuthProvider} from '../utils/AuthProvider'
import TodoCard from '../components/TodoCard'
import {
    Grid,
    GridItem,
    Stack,
    Skeleton
} from '@chakra-ui/react'

function ProjectPage(props) {

    const location = useLocation()
    const project = location.state?.projectID
    const [todo, SetTodo] = useState()
    const [discussionBoard, SetDiscussionBoard] = useState()

    useEffect(() => {
        //Runs only on the first render

        let config = {
        
        }
        const authProvider = AuthProvider()

        authProvider.authGet(`http://127.0.0.1:8000/perform/todo/handle/?project=${project}`, config)
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data.length !== undefined && res.data.length > 0)
            {
                SetTodo(res.data[0])
            }
          })
        .catch(error => {
            console.log(error);
            console.log(error.data);
          })

        authProvider.authGet(`http://127.0.0.1:8000/projects/project/discussion/handle/${project}/`, config)
        .then(res => {
            console.log(res);
            console.log(res.data);
            SetDiscussionBoard(res.data)                  
            
          })
        .catch(error => {
            console.log(error);
            console.log(error.data);
          })

    }, [todo, discussionBoard]);

    return (
        <>
            <NavBar/>
            <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={1}>
                <GridItem colSpan={1}>{todo !== undefined ? <TodoCard todo={todo} />: <Stack>
                                                                <Skeleton height='20px' />
                                                                <Skeleton height='20px' />
                                                                <Skeleton height='20px' />
                                                            </Stack>} 
                </GridItem>

                <GridItem colSpan={1}>{discussionBoard !== undefined ? <DiscussionBoardCard discussion={discussionBoard.id} title={discussionBoard.title}/>: <Stack>
                                                                <Skeleton height='20px' />
                                                                <Skeleton height='20px' />
                                                                <Skeleton height='20px' />
                                                            </Stack>} 
                </GridItem>

            </Grid>
        </>
    );
}

export default ProjectPage;
