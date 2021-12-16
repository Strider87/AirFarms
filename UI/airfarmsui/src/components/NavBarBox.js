import React from "react"
import { Flex, VStack } from "@chakra-ui/layout"

const NavBarBox = ({ children, ...props }) => {
    return (
      <VStack p={3}>
        <Flex w="100%">
            {children}
        </Flex>
      </VStack>
    )
  }

  export default NavBarBox
  