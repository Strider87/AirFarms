import React, {useState, useEffect} from 'react'
import {Form, Formik} from 'formik'
import FormikControl from './FormikControl';
import { Button } from "@chakra-ui/button";
import {
    HStack,
    Box,
    Divider
} from '@chakra-ui/react'
import * as Yup from 'yup'
import Posts from './Posts'
import {AuthProvider} from '../utils/AuthProvider'
import {useSelector} from 'react-redux'
import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import CustomFormikRichText from './CustomFormikRichText'
import CustomRichTextEditor from './CustomRichTextEditor'
import parse from "html-react-parser"

function MessageBoardRich(props) {

    let initialComments = []
    const [createdPosts, SetCreatedPosts] = useState(initialComments)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    //const [newPost, SetNewPost] = useState('')

    const user = useSelector(state => state.getUser)
    const image = useSelector(state => state.getFiles)

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
                initialComments.push(res.data.comments[i])
            }

            SetCreatedPosts(initialComments.slice())
          })
          .catch(error => {
            console.log(error);
            console.log(error.data);
          })

        }

    }, []);

    const onSubmit = async (values, onSubmitProps) => {
        //Call register API
        
        let date = new Date()

        const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        
        setEditorState(values.message)
        console.log(user.data.id);
        const comment = {
            comment: draftToHtml(convertToRaw(values.message.getCurrentContent())),
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
            SetCreatedPosts([...createdPosts, comment])
            onSubmitProps.resetForm()

            for(let i = 0; i < image.images.length; ++i)
            {
                const comment_id = {
                    comment: res.data.comment
                }
                authProvider.authPatch(`http://127.0.0.1:8000/activity/picture/comments/handle/${image.images[i].image.comment_pic_id}/`, comment_id, config)
                .then(res =>{
                    console.log(res);
                    console.log(res.data);
                })
                .catch(error => {  //Catch for Patch
                    console.log(error);
                    console.log(error.data);
                })
            }
          })
          .catch(error => { //Catch for POST
            console.log(error);
            console.log(error.data);
          })
          
        //onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
    }

    const validationSchema = Yup.object({
        message: Yup.object().required('Required')
    })

    if(user.data)
    {
        return (        
            <Formik
            initialValues={{ message: EditorState.createEmpty() }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {formik => {
                console.log(formik)
            return (

                    
                    <Form>
                        
                        <Box 
                            id="chatWindow"
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
                        {
                            createdPosts.length === 0 ? <p>Loading...</p>: createdPosts.map((postBody, idx) => {
                            return(
                                <Box>
                                    <br/>
                                    <Comments key={idx} postBody={postBody}/>
                                    <Divider/>
                                    <br/>
                                </Box>
                            )
                            })
                        }
                        </Box>
                        <br/>
                        <CustomRichTextEditor name="message" />
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

export default MessageBoardRich
