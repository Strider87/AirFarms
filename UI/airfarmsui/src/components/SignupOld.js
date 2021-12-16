import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Text, 
    Button,
    Box, 
    Flex, 
    Heading, 
    FormControl, 
    FormLabel, 
    Input

} from '@chakra-ui/react'
import ErrorAlert from "./ErrorAlert";
import axios from 'axios';
axios.defaults.withCredentials = true;


class SignupOld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phonenumber: "",
      password: "",
      first_name: "",
      last_name: "",
      about: "",
      location: "",
      birth_date: "",
      repassword: "",
      password_has_error: false,
      error: ""
    };
  }

  onChangeFirstName = e => {
    this.setState({ first_name: e.target.value });
  };

  onChangeLastName = e => {
    this.setState({ last_name: e.target.value });
  };

  onChangeAbout = e => {
    this.setState({ about: e.target.value });
  };

  onChangeLocation = e => {
    this.setState({ location: e.target.value });
  };

  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  onChangePhoneNumber = e => {
    this.setState({ phonenumber: e.target.value });
  };

  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  checkPassword() {
    if(!this.state.password || this.state.password !== this.state.repassword) {
        this.setState({password_has_error:true})
    }
    else {
        this.setState({password_has_error:false, error: ""})
    }
}

  onChangeRepeatPassword = e => {
      this.setState({ 
          repassword: e.target.value 
        }, () => {
            if (e.target.value !== null)
              this.checkPassword();
            }
        );
  }

  onSignupClick = e => {
    if(this.state.password_has_error){
        this.setState({password_has_error:true, error: "Passwords don't match"})
    }
    else{
      const user = {
        username: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phonenumber: this.state.phonenumber,
        email: this.state.email,
        about: this.state.about,
        location: this.state.location,
        birth_date: "1986-10-08",//this.state.birth_date,
        password: this.state.password
      };

      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      axios.post(`http://127.0.0.1:8000/accounts/signup/`,  user, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
          console.log(error.data);
        })
    }
    
    e.preventDefault();
  };

  render() {
    return (
        <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading color="orange.400">Signup</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl isRequired>
                <FormLabel color="orange.400">Phone number</FormLabel>
                <Input type="tel" placeholder="Phone" value={this.state.phonenumber} onChange={this.onChangePhoneNumber} />
              </FormControl>
              <FormControl>
                <FormLabel color="orange.400">Email</FormLabel>
                <Input type="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} />
              </FormControl>
              <FormControl>
                <FormLabel color="orange.400">First Name</FormLabel>
                <Input type="text" placeholder="First Name" value={this.state.first_name} onChange={this.onChangeFirstName} />
              </FormControl>
              <FormControl>
                <FormLabel color="orange.400">Last Name</FormLabel>
                <Input type="text" placeholder="Last Name" value={this.state.last_name} onChange={this.onChangeLastName} />
              </FormControl>
              <FormControl>
                <FormLabel color="orange.400">About</FormLabel>
                <Input type="text" placeholder="Describe yourself" value={this.state.about} onChange={this.onChangeAbout} />
              </FormControl>
              <FormControl>
                <FormLabel color="orange.400">Address</FormLabel>
                <Input type="text" placeholder="Address" value={this.state.location} onChange={this.onChangeLocation} />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel color="orange.400">Password</FormLabel>
                <Input type="password" placeholder="*******" value={this.state.password} onChange={this.onChangePassword} />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel color="orange.400">Re-Enter Password</FormLabel>
                <Input type="password" placeholder="*******" value={this.state.repassword} onChange={this.onChangeRepeatPassword} />
              </FormControl>
              {this.state.error && <ErrorAlert message={this.state.error} />}
              <Button width="full" mt={4} type="submit" color="orange.400" onClick={this.onSignupClick} >
                Sign Up
              </Button>
              <Text className="mt-2" color="orange.400">
              Already have account? <Link to="/login"><u>Login</u></Link>
              </Text>
            </form>
          </Box>
        </Box>
      </Flex>
    );
  }
}

export default SignupOld;