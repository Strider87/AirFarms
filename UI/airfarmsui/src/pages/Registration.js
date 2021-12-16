import React from 'react'
import Signup from '../forms/Signup'
import NavBar from "../components/NavBar";
import {
    Box, 
    Flex, 
    Heading,
    Text,
    Link
} from '@chakra-ui/react'

function Registration() {
    return (
        <div>
            <NavBar/>
            <Flex width="full" align="center" justifyContent="center">
                <Box>
                    <Box textAlign="center">
                        <Heading color="orange.400">Signup</Heading>
                        <br/>
                    </Box>
                    <Box p="6" borderWidth="2px" borderRadius="lg">
                        <Signup/>
                        <Text className="mt-2" color="orange.400">
                            Already have account? <Link to="/login"><u>Login</u></Link>
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </div>
        
    )
}

export default Registration
