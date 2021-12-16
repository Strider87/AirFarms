import React, {useState} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage
} from '@chakra-ui/react'
import { Field } from 'formik'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState} from 'draft-js';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

function WysiwygEditor(props) {
    const {label, name, required, color, ...rest} = props
    //const [, , helpers] = useField<EditorState>(props.name)

    const onSubmit = (values, form) => {
        console.log(values)
        form.setValues(values)
    }
    return (
        <Field name={name}>
            {({field, form}) => {
                console.log(field)
                console.log(form)
                return (
                    <FormControl isRequired={required} isInvalid={form.errors[name] && form.touched[name]}>
                        <FormLabel htmlFor={name} color={color}>{label}</FormLabel>
                        <Editor 
                            editorState={form.initialValues} 
                            onContentStateChange={(value) => form.setValues(value)} 
                            id={name}{...rest}{...field}/>
                        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                    </FormControl>
                )
            }}
        </Field>
    )
}

export default WysiwygEditor
