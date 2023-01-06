import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";

export default function Nav() {
  return (
    <>
      <Box bg={useColorModeValue("white")} px={4} height={20}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Image src={logo} w="90px" h="70px" margin="auto" />
          </Box>
          <Input
            variant="outline"
            placeholder="Belanja apa hari ini ?"
            marginLeft={"5px"}
          />
        </Flex>
      </Box>
    </>
  );
}
