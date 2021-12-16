import {React} from 'react'
import {useSelector} from 'react-redux'
import ProfilePicture from '../components/ProfilePicture'
import { Box, Spacer } from "@chakra-ui/react"

function UserProfile() {

    const user = useSelector(state => state.getUser)
    return (
        <Box display="flex" alignItems="left" justifyContent="space-between" ml="2">
            <ProfilePicture user={user}/>
        </Box>
    )
}

export default UserProfile
