import React from 'react';
import { useSelector } from 'react-redux';
import FormikControl from '../components/FormikControl';
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {AuthProvider} from '../utils/AuthProvider'
import {Button} from '@chakra-ui/react'
import {useHistory} from 'react-router-dom'

function Project(props) {

    const history = useHistory()
    const user = useSelector(state => state.getUser)

    const initialValues = {
        farm: props.farm_id,
        title: '',
        user: user.data.id
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required'),
    })

    const onSubmit = (values, onSubmitProps) => {
        //Call login API
        const project = {
            farm: props.farm_id,
            title : values.name,
            users : [user.data.id]
        };

        let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        const authProvider = AuthProvider()
        authProvider.authPost(`http://127.0.0.1:8000/projects/project/handle/`, project, config, false)
        .then(res =>{
            console.log(res);
            console.log(res.data);            

            const discussionBoardProject = {
                project: res.data.id
            }

            //Create project discussion board
            authProvider.authPost("http://127.0.0.1:8000/projects/project/discussion/handle/", discussionBoardProject, config, false)
            .then( resFarm =>{
                console.log(resFarm);
                console.log(resFarm.data);
            })
            .catch(error =>{
                console.log(error);
                console.log(error.data);
            })

            const todoProject = {
                project: res.data.id
            }

            //Create project todo
            authProvider.authPost("http://127.0.0.1:8000/todos/todo/handle/", todoProject, config, false)
            .then( resFarm =>{
                console.log(resFarm);
                console.log(resFarm.data);
            })
            .catch(error =>{
                console.log(error);
                console.log(error.data);
            })
            //history.push('/load-project')
            history.push('/load-project', {replace:true,
                        state: { 
                                    ProjectID: res.data.id
                                }
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

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {formik => {
            return (
                <Form>                                              
                    <FormikControl
                        control='chakraInput'
                        type='text'
                        label='Farm Name'
                        name='name'
                        required
                        color="orange.400"
                        placeholder="Your farm's name"
                    />
                    
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

export default Project;
