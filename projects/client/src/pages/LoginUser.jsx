import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Link,
  Heading,
  useColorModeValue,
  Image,
  Container,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";

//img logo import
import logo from "../assets/output-onlinepngtools.png";

const url = "http://localhost:8000/usersLogin/login";

export const LoginPage = () => {
  const userSelector = useSelector((state) => state.userSlice);

  // useRef for password and email
  const password = useRef("");
  const email = useRef("");

  //Keep login
  const dispatch = useDispatch();
  const [move, setMove] = useState(false);

  // Hide and Unhide Password
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //formik yup validation login
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("email must be example@example.com")
      .required("Required"),
  });

  //Login Function
  const onLogin = async (data) => {
    try {
      const user = {
        password: password.current.value,
        email: email.current.value,
      };
      const result = await axios.post(url, user);
      console.log(result.data);
      dispatch(login(result.data.user));
      console.log(result.data.user);
      localStorage.setItem("token", result.data.token);

      Swal.fire({
        icon: "success",
        tittle: "Sukses",
        text: result.data.msg,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        tittle: "Oops...",
        text: err.response.data,
      });
    }
  };
  return move ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          onLogin(values);
        }}
      >
        {(props) => {
          console.log(props);
          return (
            // <Container>
            <Flex
              minH={"100vh"}
              algin={"center"}
              justify={"center"}
              bgGradient="linear(to-t, #ebf5e9, #ffff)"
              maxWidth={"506px"}
            >
              <Stack spacing={4} mx={"auto"} maxW={"lg"} py={3} px={3}>
                <Image src={logo} maxW="160px" mb="5" mx="auto" />
                <Stack align={"center"}>
                  <Heading fontSize={"2xl"} color="black">
                    Log in Account
                  </Heading>
                </Stack>
                <Box
                  rounded={"lg"}
                  bg={"white"}
                  // bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <Form>
                    <Stack spacing={4}>
                      <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input as={Field} name="email" />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                      <Stack>
                        <FormControl id="password">
                          <FormLabel>Password</FormLabel>
                          <InputGroup>
                            <Input
                              as={Field}
                              name="password"
                              type={show ? "text" : "password"}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              style={{ color: "red" }}
                            />
                            <InputRightElement h={"full"}>
                              <Button variant={"ghost"} onClick={handleClick}>
                                {show ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      </Stack>
                      <Stack spacing={2}>
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          align={"start"}
                          justify={"space-between"}
                        ></Stack>
                        <Link color={"blue.400"} href="/register">
                          Dont have account?
                        </Link>
                      </Stack>
                      <Button
                        bg={"yellow.400"}
                        color={"black"}
                        _hover={{
                          bg: "yellow.300",
                        }}
                        onClick={onLogin}
                        type="submit"
                      >
                        Sign in
                      </Button>

                      {/* <Button isLoading bg={"blue.300"} color={"white"} /> */}
                    </Stack>
                  </Form>
                </Box>
              </Stack>
            </Flex>
            // </Container>
          );
        }}
      </Formik>
    </>
  );
};
