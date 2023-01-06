import { EmailIcon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  Box,
  Text,
  Stack,
  Divider,
  Input,
  Button,
  Image,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartSync } from "../redux/cartSlice";
import { deleteCart } from "../redux/userSlice";

export default function CartDetail() {
  const { id, email, isVerified, cart } = useSelector(
    (state) => state.userSlice.value
  );

  const dataCart = useSelector((state) => state.cartSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/cart/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Cart Successfully Deleted",
        timer: 2000,
      });
      const result = await axios.get(`http://localhost:8000/cart/${id}`);
      dispatch(cartSync(result.data));
      dispatch(deleteCart());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        algin={"center"}
        justify={"center"}
        bgGradient="linear(to-t,  #ebf5e9, #ffff)"
        maxWidth={"506px"}
      >
        <Stack spacing={4} mx={"auto"} maxW={"lg"}>
          <Text fontWeight={"bold"} fontSize="xl">
            Keterangan Keranjang
          </Text>
          <Box display={"flex"}>
            <Text fontWeight={"semibold"}>Email: </Text>
            <Text fontWeight={"semibold"}> {email}</Text>
          </Box>

          <Divider />

          <Box display="flex" justifyContent={"center"}>
            <Text fontWeight="bold">Item yang dibeli:</Text>
            <Text fontWeight="bold">{cart}</Text>
          </Box>
          <Box mt="10px" display="flex" justifyContent="flex-end">
            <Button
              // onClick={() => onBorrow()}
              w="full"
              borderColor="pink.400"
              borderRadius="9px"
              borderWidth="2px"
              _hover={{ bg: "pink" }}
              disabled={dataCart.length === 0 ? true : false}
            >
              Beli
            </Button>
          </Box>

          <Box>
            {dataCart.length === 0 ? (
              <>
                <Box align="center">
                  <Text>Keranjang Kosong</Text>
                  <Text
                    // as={Link}
                    to="/"
                    textAlign="center"
                    fontWeight="bold"
                    color="pink.400"
                    w="150px"
                    _hover={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Beli sekarang
                  </Text>
                </Box>
              </>
            ) : (
              // {dataCart.map(item => {
              //   return (
              <Box>
                {dataCart.map((item) => {
                  return (
                    <>
                      <Flex>
                        <Box>
                          <Box>
                            <Link href={`/productdetails/${item.id}`}>
                              <Image
                                objectFit="cover"
                                // src={item.Product.Images}
                                width="100px"
                                height="100px"
                              />
                            </Link>
                          </Box>
                          <Box>
                            <Link href={`/productdetails/${item.id}`}>
                              <Text fontWeight="semibold">
                                {item.Product.name}
                              </Text>
                              <Text fontWeight="semibold" fontSize="small">
                                {item.Product.size}
                              </Text>
                              <Text
                                fontWeight="semibold"
                                color="#213360"
                                textColor="#FF6B6B"
                              >
                                {item.Product.Price}
                              </Text>
                            </Link>
                          </Box>
                        </Box>
                        <Tooltip label="Hapus Dari Keranjang" fontSize="sm">
                          <Button
                            variant="link"
                            color="pink.400"
                            size="sm"
                            onClick={() => onDeleteCart(item.id)}
                            _hover={{ color: "pink" }}
                          >
                            <Icon boxSize={4} as={FaTrashAlt} />
                          </Button>
                        </Tooltip>
                      </Flex>
                      <Divider />
                    </>
                  );
                })}
              </Box>
            )}
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
