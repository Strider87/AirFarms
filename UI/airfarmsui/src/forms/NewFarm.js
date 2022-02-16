import React from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import { Button } from "@chakra-ui/button";
import FormikControl from '../components/FormikControl';
import { useHistory } from "react-router-dom";
import {
    HStack,
    VStack
} from '@chakra-ui/react'
import {AuthProvider} from '../utils/AuthProvider'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { farmAction } from '../storeActions';
import DiscussionBoard from '../tools/DiscussionBoard';

function NewFarm() {

    const history = useHistory()
    const user = useSelector(state => state.getUser)
    const dispatch = useDispatch()

    const initialValues = {
        name:'',
        description: '',
        user: user.id
    }

    const onSubmit = (values, onSubmitProps) => {
        //Call login API
        const farm = {
            name: values.name,
            description : values.description,
            user : user.data.id
        };

        let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        const authProvider = AuthProvider()
        authProvider.authPost(`http://127.0.0.1:8000/farm/perform/manage/`, farm, config, false)
        .then(res =>{
            console.log(res);
            console.log(res.data);
            const farmPictureURL = `http://127.0.0.1:8000/farm/perform/manage/farmpicture/`
            const farmPicture = {
                farm: res.data.id,
                description: res.data.description
            }
            authProvider.authPost(farmPictureURL, farmPicture, config, false)
            .then( resPic =>{
                console.log(resPic);
                console.log(resPic.data);
                dispatch(farmAction(res.data));
                history.push('/create-farm')
            })
            .catch(error =>{
                console.log(error);
                console.log(error.data);
            })

            const discussionBoardFarm = {
                farm: res.data.id
            }

            //Create farm discussion board
            authProvider.authPost("http://127.0.0.1:8000/farm/perform/farm/discussionboard/", discussionBoardFarm, config, false)
            .then( resFarm =>{
                console.log(resFarm);
                console.log(resFarm.data);
            })
            .catch(error =>{
                console.log(error);
                console.log(error.data);
            })
            
            onSubmitProps.resetForm()
        })
        .catch(error => {
            console.log(error);
            console.log(error.data);
        })
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required'),
        description: Yup.string()
            .required('Required')
    })

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {formik => {
            return (
                <Form>
                    <VStack>                                               
                        <FormikControl
                            control='chakraInput'
                            type='text'
                            label='Farm Name'
                            name='name'
                            required
                            color="orange.400"
                            placeholder="Your farm's name"
                        />
                        <FormikControl
                            control='chakraTextArea'
                            type='text'
                            label='Farm Description'
                            name='description'
                            required
                            color="orange.400"
                            placeholder="Describe your farm"
                        />
                    </VStack>
                    
                    <br/>
                    <Button 
                        type='submit' 
                        disabled={!formik.isValid}
                        width="full"
                        color="orange.400"
                    >
                        Next
                    </Button>                
                </Form>
                )
            }}            
            </Formik>
    )
}

export default NewFarm
