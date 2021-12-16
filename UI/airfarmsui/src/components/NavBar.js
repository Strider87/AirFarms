import React from "react"
import NavBarBox from "./NavBarBox"
import Header from "./Header"
import MenuToggle from "./MenuToggle"
import Logo from "./Logo"
import { Spacer } from "@chakra-ui/layout";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false)
  
    const toggle = () => setIsOpen(!isOpen)
  
    return (
      <NavBarBox {...props}>
        <Logo
          w="100px"
          color={["black", "black", "primary.500", "primary.500"]}
        />
        <Spacer></Spacer>
        <Header isOpen={isOpen} />

      </NavBarBox>
    )
  }

  export default NavBar