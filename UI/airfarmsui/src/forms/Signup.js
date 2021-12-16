import React from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import { Button } from "@chakra-ui/button";
import FormikControl from '../components/FormikControl';
import ErrorAlert from '../components/ErrorAlert';
import {
    HStack,
    VStack
} from '@chakra-ui/react'
import axios from 'axios';
axios.defaults.withCredentials = true;

function Signup() {

    const initialValues = {
        name:'',
        email:'',
        phone: '',
        password: '',
        confirmPassword: '',
        about: '',
        location: '',
        birthDate: ''
    }

    const onSubmit = (values, onSubmitProps) => {
        //Call register API
        const user = {
            username: values.email,
            first_name: values.name,
            last_name: "",
            phonenumber: values.phone,
            email: values.email,
            about: values.about,
            location: values.location,
            birth_date: "1986-10-08",//this.state.birth_date,
            password: values.password
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
            setErrorFlag(false)
            setError('')
            onSubmitProps.resetForm()
          })
          .catch(error => {
            console.log(error);
            console.log(error.data);
            setErrorFlag(true)
            setError(error)
          })
          
        onSubmitProps.setSubmitting(false)
    }

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [error, setError] = React.useState('')
    const [errorFlag, setErrorFlag] = React.useState(false)

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string()
            .email('Invalid email ID')
            .required('Required'),
        phone: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Required')
    })

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {formik => {
        console.log('Formik object', formik)
        return (
            <Form>
                {errorFlag && <ErrorAlert message={this.state.error} />}
                <VStack>
                    <HStack>
                        <FormikControl
                            control='chakraInput'
                            type='email'
                            label='Email'
                            name='email'
                            required
                            color="orange.400"
                        />                       
                        <FormikControl
                            control='chakraInput'
                            type='tel'
                            label='Phone number'
                            name='phone'
                            required
                            color="orange.400"
                        />
                    </HStack>
                    <HStack>                        
                        <FormikControl
                            control='chakraInput'
                            type='text'
                            label='Address'
                            name='location'
                            required
                            color="orange.400"
                        />
                        <FormikControl
                            control='chakraInput'
                            type='text'
                            label='Pin Code'
                            name='pin'
                            required
                            color="orange.400"
                        />                        
                    </HStack>
                </VStack>
                <FormikControl
                    control='chakraTextArea'
                    type='text'
                    label='About'
                    name='about'
                    color="orange.400"
                />
                <FormikControl
                    control='chakraInput'
                    type='text'
                    label='Name'
                    name='name'
                    required
                    color="orange.400"
                />
                <FormikControl
                    control='chakraInput'
                    type={show ? "text" : "password"}
                    label='Password'
                    name='password'
                    required
                    color="orange.400"
                />
                <FormikControl
                    control='chakraInput'
                    type='password'
                    label='Confirm Password'
                    name='confirmPassword'
                    required
                    color="orange.400"
                />
                <br/>
                <HStack>
                    <Button 
                        type='submit' 
                        disabled={!formik.isValid}
                        width="full"
                        color="orange.400"
                    >
                        Submit
                    </Button>                
                    <Button 
                        type='reset'
                        width="full"
                        color="orange.400"
                    >
                        Reset
                    </Button>
                </HStack>
            </Form>
            )
        }}            
        </Formik>
    )
}

export default Signup
