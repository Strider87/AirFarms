import React from 'react'
import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage
} from '@chakra-ui/react'
import { Field } from 'formik'

function ChakraInput(props) {
    const {label, name, required, color, ...rest} = props
    return (
        <Field name={name}>
            {({field, form}) => {
                return (
                    <FormControl isRequired={required} isInvalid={form.errors[name] && form.touched[name]}>
                        <FormLabel htmlFor={name} color={color}>{label}</FormLabel>
                        <Input id={name}{...rest}{...field}/>
                        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                    </FormControl>
                )
            }}
        </Field>
    )
}

export default ChakraInput
