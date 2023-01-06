import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Axios from 'axios';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
const url = 'http://localhost:8000/users/register';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  const registerSchema = Yup.object().shape({
    password: Yup.string().required().min(6, 'Password min 6 Character'),
  });

  const onRegister = async (data) => {
    try {
      console.log('cek data', data);
      const res = await Axios.post(url, data);
      console.log('result', res.data);
      Swal.fire({
        icon: 'success',
        title: 'Sukses',
        text: 'Login Berhasil',
      });
    } catch (err) {
      console.log('err', err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        phone_number: '',
      }}
      validationSchema={registerSchema}
      onSubmit={(values, action) => {
        console.log('onSubmit', values);
        onRegister(values);
      }}>
      {(props) => {
        console.log(props);
        return (
          <>
            <Form onSubmit={props.handleSubmit}>
              <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                  <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                      Register
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                      input your data 🥦
                    </Text>
                  </Stack>
                  <Box
                    rounded={'lg'}
                    bg={('green.200', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                      <Box>
                        <FormControl id='firstName' isRequired>
                          <FormLabel>Name</FormLabel>
                          <Field as={Input} name='name' />
                        </FormControl>
                      </Box>
                      <FormControl id='email' isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Field as={Input} name='email' />
                      </FormControl>
                      <FormControl id='password' isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                          />
                          <InputRightElement h={'full'}>
                            <Button
                              variant={'ghost'}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }>
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <FormControl id='phone_number' isRequired>
                        <FormLabel>Phone Number</FormLabel>
                        <Field as={Input} name='phone_number' />
                      </FormControl>
                      <Stack spacing={10} pt={2}>
                        <Button
                          // onClick={onRegister}
                          type='submit'
                          loadingText='Submitting'
                          size='lg'
                          bg={'blue.400'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}>
                          Sign up
                        </Button>
                      </Stack>
                      <Stack pt={6}>
                        <Text align={'center'}>
                          Already a user? <Link color={'blue.400'}>Login</Link>
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}
