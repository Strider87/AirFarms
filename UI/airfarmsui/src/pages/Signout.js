import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from '../forms/Logout'
import Login from "../forms/Login";
import {
    Text,
    Box, 
    Flex, 
    Heading
} from '@chakra-ui/react'
import NavBar from "../components/NavBar";

class Signout extends Component {  
  render() {
    return (
    <div>
      <NavBar/>
      <Flex width="full" align="center" justifyContent="center">
        <Box>
          <Box textAlign="center">
            <Heading color="orange.400">Logout Successful</Heading>
            <br/>
          </Box>
          <Box p="6" borderWidth="2px" borderRadius="lg">
              <Logout/>
              <Text className="mt-2" color="orange.400">
                  <Link to="/login"><u>Login</u></Link>
              </Text>
          </Box>
        </Box>
      </Flex>
    </div>
    );
  }

  componentDidMount(){
      
  }
}

export default Signout;