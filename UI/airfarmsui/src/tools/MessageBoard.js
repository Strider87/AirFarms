import React, {useState, useEffect} from 'react'
import {Form, Formik} from 'formik'
import FormikControl from '../components/FormikControl';
import { Button } from "@chakra-ui/button";
import {
    HStack,
    Box
} from '@chakra-ui/react'
import * as Yup from 'yup'
import Posts from '../components/Posts'
import {AuthProvider} from '../utils/AuthProvider'
import {useSelector} from 'react-redux'

function MessageBoard(props) {

    let initialComments = []
    const [createdPosts, SetCreatedPosts] = useState(initialComments)
    //const [newPost, SetNewPost] = useState('')

    const user = useSelector(state => state.getUser)

    useEffect(() => {
        if(user.data)
        {
        //Runs only on the first render
        const queryComments = {
            post : props.post_id,
            user : user.data.id
          };

        let config = {
        headers: {
            'Content-Type': 'application/json'
        }
        }
        const authProvider = AuthProvider()

        authProvider.authPost(`http://127.0.0.1:8000/activity/comments/get/`, queryComments, config, false)
          .then(res => {
            console.log(res);
            console.log(res.data);
            
            for(let i = 0; i <  res.data.comments.length; ++i)
            {
                initialComments.push(res.data.comments[i].comment)
            }

            SetCreatedPosts(initialComments.slice())
          })
          .catch(error => {
            console.log(error);
            console.log(error.data);
          })

        }

    }, []);

    const initialValues = {
        comment: "",
        comment_date : "",
        post : "",
        user : ""
    }

    const onSubmit = (values, onSubmitProps) => {
        //Call register API
        
        let date = new Date()

        const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

        console.log(user.data.id);
        const comment = {
            comment: values.message,
            comment_date : dateString.toString(),
            post : props.post_id,
            user : user.data.id
          };

        let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        const authProvider = AuthProvider()
        authProvider.authPost(`http://127.0.0.1:8000/activity/comment/new/`, comment, config, false)
          .then(res => {
            console.log(res);
            console.log(res.data);
            SetCreatedPosts([...createdPosts, values.message])
            onSubmitProps.resetForm()
          })
          .catch(error => {
            console.log(error);
            console.log(error.data);
          })
          
        //onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
    }

    const validationSchema = Yup.object({
        message: Yup.string().required('Required')
    })

    if(user.data)
    {
        return (        
            <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {formik => {
            return (
                    <Form>
                        
                        <Box p="6" borderWidth="2px" borderRadius="lg">
                        {
                            createdPosts.length === 0 ? <p>Loading...</p>: createdPosts.map((postBody, idx) => {
                            return(
                                <Posts key={idx} postBody={postBody}/>
                            )
                            })
                        }
                        </Box>
                        <FormikControl
                            control='chakraTextArea'
                            type='text'
                            label='Message'
                            name='message'
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
                )}
            }
            </Formik>
        )
    }
    else
    {
        return(
            <></>
        )
    }
}

export default MessageBoard
