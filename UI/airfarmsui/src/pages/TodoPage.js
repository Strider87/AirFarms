import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom"
import NavBar from '../components/NavBar'
import {AuthProvider} from '../utils/AuthProvider'
import {
    Box,
    Grid,
    GridItem,
} from '@chakra-ui/react'
import TaskItem from '../components/TaskItem'
import CreateTaskCard from '../components/CreateTaskCard'

function TodoPage() {

    const location = useLocation()
    const todo = location.state?.todoID
    let initialTasks = []
    const [taskList, SetTaskList] = useState(initialTasks)

    useEffect(() => {
        //Runs only on the first render

        let config = {
        
        }
        const authProvider = AuthProvider()

        authProvider.authGet(`http://127.0.0.1:8000/perform/task/handle/?todoItem=${todo}`, config)
        .then(res => {
            console.log(res);
            console.log(res.data);
            for(let i = 0; i < res.data.length; i++)
            {
                initialTasks.push(res.data)
            }
            SetTaskList(initialTasks.slice())  
            
          })
        .catch(error => {
            console.log(error);
            console.log(error.data);
          })

    }, [taskList]);

    return (
        <>
            <NavBar />
            <Box 
            id="projectList"
            p="6"
            maxH="600px"
            borderWidth="2px"
            borderRadius="lg"
            overflowY="auto"
            css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'orange',
                    borderRadius: '24px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555'
                }
                }}
            >
                <Grid templateRows='repeat(5, 1fr)' >
                    {
                        taskList.length === 0 ? <p>Loading...</p>: taskList.map((taskBody, idx) => {
                        return(
                            <GridItem>
                                    <TaskItem key={idx} taskBody={taskBody[idx]}/>
                            </GridItem>
                        )
                        })
                    }
                    <GridItem>
                        <CreateTaskCard todo={todo}/>
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

export default TodoPage;
