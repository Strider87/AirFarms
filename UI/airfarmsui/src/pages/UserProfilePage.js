import React from 'react'
import NavBar from '../components/NavBar'
import FarmList from '../components/FarmList'
import UserProfile from '../data/UserProfile'
import {HStack} from '@chakra-ui/react'


function UserProfilePage() {
    return (
        <>
            <NavBar/>
            <HStack>
                <UserProfile/>
                <FarmList/>
            </HStack>
        </>
    )
}

export default UserProfilePage
