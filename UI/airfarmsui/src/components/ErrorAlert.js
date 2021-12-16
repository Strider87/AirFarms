import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertDescription,
    Box
  } from "@chakra-ui/react"

function ErrorAlert({ message }) {
    return (
        <Box my={4}>
            <Alert status="error" borderRadius={4}>
                <AlertIcon />
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        </Box>
    )
}

export default ErrorAlert
