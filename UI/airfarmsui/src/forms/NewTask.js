import React from 'react';
import { useSelector } from 'react-redux';
import FormikControl from '../components/FormikControl';
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {AuthProvider} from '../utils/AuthProvider'
import {
    Button,
    VStack,
    HStack
} from '@chakra-ui/react'
import {useHistory} from 'react-router-dom'

function NewTask(props) {
    const history = useHistory()
    const user = useSelector(state => state.getUser)

    const initialValues = {
        title: '',
        notes: '',
        completion_date: '',
        assignee: [user.data.id,],
        notifiers: [user.data.id,],
        todoItem: props.todoID
    }

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Required'),
        notes: Yup.string()
            .required('Required'),
    })

    const onSubmit = (values, onSubmitProps) => {
        //Call login API
        let date = new Date(values.completionDate)
        let dateSting = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        const task = {
            title: values.title,
            notes: values.notes,
            completion_date: dateSting,
            assignee: [user.data.id, /*...values.assignee*/],
            notifiers: [user.data.id, /*...values.notifiers*/],
            todoItem: props.todoID
        };

        let config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        const authProvider = AuthProvider()
        authProvider.authPost(`http://127.0.0.1:8000/perform/task/handle/`, task, config, false)
        .then(res =>{
            console.log(res);
            console.log(res.data);            

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
        console.log('Formik object', formik)
        return (
            <Form>
                <VStack>
                    <FormikControl
                        control='chakraInput'
                        type='text'
                        label='Title'
                        name='title'
                        required
                        color="orange.400"
                    />
                    <FormikControl
                        control='chakraTextArea'
                        type='text'
                        label='Notes'
                        name='notes'
                        required
                        color="orange.400"
                    />   
                    <FormikControl
                        control='chakraDatePicker'
                        type='text'
                        label='Completion Date'
                        name='completionDate'
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

export default NewTask;
