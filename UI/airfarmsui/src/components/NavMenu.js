import React from 'react'
import MenuItems from './MenuItems'
import {IconButton} from '@chakra-ui/button'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from "@chakra-ui/react"

function NavMenu(props) {

    const signedIn = props.loggedin

    if(signedIn)
    {
        return (
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                />
                <MenuList>
                    <MenuItem><MenuItems ml={2} color="orange.400" to="/profile">Profile</MenuItems></MenuItem>
                    <MenuItem><MenuItems ml={2} color="orange.400" to="/logout">Logout</MenuItems></MenuItem>
                </MenuList>
            </Menu>           
        )
    }
    else
    {
        return (            
                <MenuItems ml={2} color="orange.400" to="/login">Login</MenuItems>        
            )
    }
}

export default NavMenu
