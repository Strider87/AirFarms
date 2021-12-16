import React from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import { Button } from "@chakra-ui/button";
import FormikControl from '../components/FormikControl';
import { useHistory } from "react-router-dom";
import {
    HStack,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react'
import {AuthProvider} from '../utils/AuthProvider'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { userAction } from '../storeActions';

export default function Login(props) {

    const history = useHistory()

    const [cookies, setCookie] = useCookies(['airfarms']);
    
    const initialValues = {
        username:'',
        password: ''
    }

    const dispatch = useDispatch()

    const onSubmitPhone = (values, onSubmitProps) => {
        //Call login API
        const user = {
            username: values.phone,
            password: values.password
          };

        let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        const authProvider = AuthProvider()
        authProvider.authPost(`http://127.0.0.1:8000/accounts/login`, user, config, true)
        .then(res =>{
            console.log(res);
            console.log(res.data);
            const profilePictureURL = `http://127.0.0.1:8000${res.data.picture}`
            const userData = {
                data : res.data.user,
                picture : profilePictureURL
            }     
            dispatch(userAction(userData));
            setCookie('airfarms_access_token', res.data.airfarms_access_token, { samesite : 'lax' });
            
            authProvider.login()
            history.push('/user-dashboard')
            setErrorFlag(false)
            setError('')
            onSubmitProps.resetForm()
        })
        .catch(error => {
            console.log(error);
            console.log(error.data);
            dispatch(userAction('{}'));
            setErrorFlag(true)
            setError(error)
        })
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
    }

    const onSubmitEmail = (values, onSubmitProps) => {
        //Call login API
        const user = {
            username: values.email,
            password: values.password
          };
        
        let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        const authProvider = AuthProvider()
        authProvider.authPost(`http://127.0.0.1:8000/accounts/login`,  user, config, true)
          .then(res => {
            console.log(res);
            console.log(res.data);
            setCookie('airfarms_access_token', res.data.airfarms_access_token, { samesite : 'lax' });
            authProvider.login()
            history.push('/user-dashboard')
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
        authProvider.login()
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
    }


    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [error, setError] = React.useState('')
    const [errorFlag, setErrorFlag] = React.useState(false)

    const validationSchemaPhone = Yup.object({
        phone: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required')
    })

    const validationSchemaEmail = Yup.object({
        email: Yup.string()
            .required('Required')
            .email('Invalid email ID'),
        password: Yup.string()
            .required('Required')
    })
    

    return (

        <Tabs variant="enclosed">
            <TabList>
                <Tab>Phone</Tab>
                <Tab>Email</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmitPhone}
                    validationSchema={validationSchemaPhone}>
                    {formik => {
                    return (
                        <Form>
                            <VStack>                                               
                                <FormikControl
                                    control='chakraInput'
                                    type='tel'
                                    label='Phone number'
                                    name='phone'
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
                            </VStack>
                            
                            <br/>
                            <HStack>
                            <Button 
                                type='submit' 
                                disabled={!formik.isValid}
                                width="full"
                                color="orange.400"
                            >
                                Login
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
                </TabPanel>
                <TabPanel>
                    <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmitEmail}
                    validationSchema={validationSchemaEmail}>
                    {formik => {
                    return (
                        <Form>
                            <VStack>
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
                                    type={show ? "text" : "password"}
                                    label='Password'
                                    name='password'
                                    required
                                    color="orange.400"
                                />
                            </VStack>
                            
                            <br/>
                            <HStack>
                            <Button 
                                type='submit' 
                                disabled={!formik.isValid}
                                width="full"
                                color="orange.400"
                            >
                                Login
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
                </TabPanel>
            </TabPanels>
        </Tabs>
        
    )
}
