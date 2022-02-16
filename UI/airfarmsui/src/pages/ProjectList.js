import React, {useState, useEffect} from 'react'
import {
    Grid,
    GridItem,
    Box
} from '@chakra-ui/react'
import ProjectCard from '../components/ProjectCard'
import CreateProjectCard from '../components/CreateProjectCard'
import {useSelector} from 'react-redux'
import {AuthProvider} from '../utils/AuthProvider'
import { useLocation } from "react-router-dom"
import NavBar from '../components/NavBar'

function ProjectList(props) {
    const location = useLocation()
    const farm_id = location.state?.farmID

    const userData = useSelector(state => state.getUser)
    let initialProjects = []
    const [projectList, SetProjectList] = useState(initialProjects)

    useEffect(() => {
        if(userData)
        {
        //Runs only on the first render

        let config = {
        
        }
        const authProvider = AuthProvider()

        authProvider.authGet(`http://127.0.0.1:8000/projects/project/instances/?farm=${farm_id}`, config)
        .then(res => {
            console.log(res);
            console.log(res.data);  
            initialProjects.push(res.data)
            SetProjectList(initialProjects.slice()) 
            
          })
        .catch(error => {
            console.log(error);
            console.log(error.data);
          })

        }

    }, [projectList]);

    return (
        <>
        <NavBar/>
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
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {
            projectList.length === 0 ? <p>Loading...</p>: projectList.map((projectBody, idx) => {
            return(
                <GridItem>
                        <ProjectCard key={idx} projectBody={projectBody[idx]}/>
                </GridItem>
            )
            })
        }
        <GridItem>
            <CreateProjectCard farm_id={farm_id}/>
        </GridItem>
        </Grid>
        </Box>
        </>
    )
}

export default ProjectList
