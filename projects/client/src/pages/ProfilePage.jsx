import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, ErrorMessage, Field, useFormik } from "formik";
export { SmallCloseIcon } from "@chakra-ui/icons";

export const UserProfile = () => {
  const { id } = useSelector((state) => state.userSlice.value);

  // bug fix nanti buat edit profile
  // const { name } = useSelector((state) => state.userSlice.value);
  // const { email } = useSelector((state) => state.userSlice.value);
  // const { gender } = useSelector((state) => state.userSlice.value);
  // const { birthdate } = useSelector((state) => state.userSlice.value);

  // console.log(id);
  // console.log(name);
  // console.log(email);
  // console.log(gender);
  // console.log(birthdate);

  //useState untuk panggil data profile dan edit image
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState("");

  //url get ID dan Update Profile
  const urlGetId = `http://localhost:8000/usersLogin/getUserId/${id}`;
  const urlUpdateProfile = `http://localhost:8000/usersLogin/editProfile/${id}`;
  const urlUpdateImage = `http://localhost:8000/usersLogin/uploadFile/${id}`;

  //choose file upload
  const handleChoose = (e) => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
    console.log(setImage);
  };

  //upload picture
  const handleUpload = async () => {
    const up = new FormData();
    console.log(up);
    up.append("file", image);
    console.log(up.get("file"));

    const uploadImage = await axios.post(urlUpdateImage, up, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(uploadImage.data);
    setProfile(uploadImage.data.profile_picture_url);

    setImage({ images: "" });
  };
  console.log(image);
  console.log(profile);

  //edit data profile using useRef
  const name = useRef("");
  const email = useRef("");
  const gender = useRef("");
  const birthdate = useRef("");

  const editProfile = async () => {
    try {
      const editData = {
        name: name.current.value,
        email: email.current.value,
        gender: gender.current.value,
        birthdate: birthdate.current.value,
      };
      const resultEdit = axios.patch(urlUpdateProfile);
      console.log(resultEdit);
      Swal.fire({
        icon: "success",
        title: "Edited",
        text: "Succesfuly Edited",
        timer: 20000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // //get user ID by Formik
  const getUserId = async () => {
    try {
      const res = await axios.get(urlGetId);
      console.log(res.data);
      formik.setFieldValue("name", res.data.name);
      formik.setFieldValue("email", res.data.email);
      formik.setFieldValue("gender", res.data.gender);
      formik.setFieldValue("birthdate", res.data.birthdate);
    } catch (err) {
      console.log(err);
    }
  };

  //formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      birthdate: "",
    },
  });

  console.log(formik);

  //panggil UserID
  useEffect(() => {
    getUserId();
  }, []);

  return (
    <>
      <Container>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          // bg={useColorModeValue("pink.50", "whiteAlpha.700")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            // bg={useColorModeValue("white", "pink.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              User Profile Edit
            </Heading>
            <FormControl id="name">
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size={"xl"} src={`http://localhost:8000/${profile}`}>
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded={"full"}
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w={"full"}>
                  <Button w="full" onClick={handleUpload}>
                    Change Icon
                  </Button>
                </Center>
                <Center w={"full"}>
                  <form encType="multipart/form-data">
                    <Input
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={(e) => handleChoose(e)}
                    />
                  </form>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                ref={name}
                value={formik.values.name}
                onChange={(event) =>
                  formik.setFieldValue("name", event.target.value)
                }
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                ref={email}
                value={formik.values.email}
                onChange={(event) =>
                  formik.setFieldValue("email", event.target.value)
                }
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <FormControl id="gender">
              <FormLabel>Gender</FormLabel>
              <Input
                ref={gender}
                value={formik.values.gender}
                onChange={(event) =>
                  formik.setFieldValue("gender", event.target.value)
                }
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="birthdate">
              <FormLabel>Birthdate</FormLabel>
              <Input
                ref={birthdate}
                value={formik.values.birthdate}
                onChange={(event) =>
                  formik.setFieldValue("birthdate", event.target.value)
                }
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={editProfile}
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Container>
      );
    </>
  );
};
