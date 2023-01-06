import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import notFound from "../assets/404.png";

export default function Pages404() {
  return (
    <>
      <Container height={"790px"}>
        <Image src={notFound} margin={"auto"} />
        <Stack as={Box} textAlign={"center"}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Oops, The page you were looking for
            <br />
            <Text as={"span"} color={"green.400"}>
              doesn't exist.
            </Text>
          </Heading>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
                href: "/",
              }}
              as={Link}
              to="/"
            >
              Back To Home{" "}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
