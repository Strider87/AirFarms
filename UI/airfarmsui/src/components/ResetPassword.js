import React from 'react'
import { 
    Button,
    Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody
} from '@chakra-ui/react'

function ResetPassword() {
    return (
        <Popover>
            <PopoverTrigger>
                <Button mt={2} color="orange.400" variant="link"><u>Reset Password</u></Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader color="orange.400">Reset Password</PopoverHeader>
                <PopoverBody mt={2} color="orange.400">Email address to send password reset link
                    <Input mt={2} type="email" placeholder="Email"/>  
                    <Button to="/resetpassword" mt={2} type="submit" color="orange.400">Send</Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ResetPassword
