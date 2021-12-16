import React from 'react'
import MenuItems from './MenuItems'
import { Box } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {IconButton} from '@chakra-ui/button'
import NavMenu from './NavMenu';
import {TokenProvider} from '../utils/TokenProvider'

function Header() {

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";  
    
    const tokenProvider = TokenProvider();
    const signedIn = tokenProvider.isLoggedIn()

    
    {
    return (
            <Box>                
                {signedIn ? <MenuItems ml={2} color="orange.400" to="/">Dashboard</MenuItems>: <MenuItems ml={2} color="orange.400" to="/">Home</MenuItems> }
                <NavMenu loggedin = {signedIn}/>
                <IconButton ml={8} icon={isDark ? <SunIcon color="orange.400"/> : <MoonIcon color="orange.400"/>} onClick={toggleColorMode}></IconButton>            
            </Box>

        )
    }
}

export default Header
