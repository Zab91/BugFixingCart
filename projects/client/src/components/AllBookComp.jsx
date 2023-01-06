import {
  Box,
  Button,
  Icon,
  Text,
  Image,
  Stack,
  Flex,
  Center,
} from "@chakra-ui/react";

import { IoCartOutline } from "react-icons/io5";
// import NextLink from 'next/link';
import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/productSlice";
import { cartSync } from "../redux/cartSlice";
import Swal from "sweetalert2";
import { addCart } from "../redux/userSlice";
import { Link } from "react-router-dom";

export default function BookCard() {
  const { email, isVerified, cart } = useSelector(
    (state) => state.userSlice.value
  );
  const [limit, setLimit] = useState(5);
  const [searchProduct, setSearchProduct] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [order, setOrder] = useState("name");
  const [order_direction, setOrder_direction] = useState("ASC");
  const [idbook, setIdbook] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.productSlice.value);
  const [state, setState] = useState("");

  const url = `http://localhost:8000/product/view?search_query=${searchProduct}&page=${
    page - 1
  }&limit=${limit}&order=${order ? order : `id`}&order_direction=${
    order_direction ? order_direction : "DESC"
  }`;

  const getData = async () => {
    try {
      const res = await Axios.get(url);

      dispatch(syncData(res.data.result));
      setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchProduct(filter) {
    setOrder_direction(filter);
  }
  async function fetchCategory(filter) {
    setOrder(filter);
  }
  async function fetchLimit(filter) {
    setLimit(filter);
  }

  const onAddCart = async (ProductId) => {
    try {
      if (!email) {
        return Swal.fire({
          icon: "error",
          title: "Akses Ditolak",
          text: "Silahkan Masukan Akun Anda",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }
      // if (cart >= 5) {
      //   return Swal.fire({
      //     icon: "error",
      //     title: "Oooops ...",
      //     text: "Keranjang Penuh",
      //     timer: 2000,
      //     customClass: {
      //       container: "my-swal",
      //     },
      //   });
      // }
      const result = await Axios.post("http://localhost:8000/cart/add", {
        UserId: email,
        ProductId,
      });
      setState(result.data);
      const res = await Axios.get(`http://localhost:8000/cart/${email}`);
      dispatch(cartSync(res.data));
      dispatch(addCart());
      getData();

      Swal.fire({
        icon: "success",
        title: "Keranjang Berhasil Ditambahkan",
        text: `${result.data.massage}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  useEffect(() => {
    getData();
  }, [searchProduct, limit, totalPage, order, order_direction, page, state]);

  useEffect(() => {
    fetchProduct();
    fetchCategory();
    fetchLimit();
  }, []);

  return (
    <div style={{ pt: "10px" }}>
      <Center>
        <Flex flexWrap={"wrap"} justifyContent="center">
          {data.map((item) => {
            return (
              <>
                <Stack>
                  <Box
                    w="230px"
                    h="293px"
                    borderWidth="1px"
                    m="10px"
                    _hover={{ boxShadow: "xl" }}
                    boxShadow="base"
                    borderRadius="13px"
                  >
                    <Box
                      h="155px"
                      w="full"
                      _hover={{ cursor: "pointer" }}
                      borderTopRadius="13px"
                      overflow="hidden"
                    >
                      <Image
                        objectFit="cover"
                        src={item.images}
                        width="180px"
                        height="155px"
                        margin={"auto"}
                      />
                    </Box>
                    <Stack>
                      <Box px="10px" h="90px">
                        <Stack>
                          <Box h="20px" as={Link} to={`/detail/${item.id}`}>
                            <Text
                              _hover={{ cursor: "pointer", color: "red" }}
                              fontWeight="bold"
                            >
                              {item.name.substring(0, 25)}
                              {item.name.length >= 25 ? "..." : null}
                            </Text>
                          </Box>
                        </Stack>
                        <Stack>
                          <Box h="30px" fontSize="10px" marginTop={"5px"}>
                            <Text mr="5px">
                              {" "}
                              {item.statement.substring(0, 50)}
                              {item.statement.length >= 50 ? "..." : null}
                            </Text>
                          </Box>
                        </Stack>
                        <Stack>
                          <Box fontSize="xs">
                            <Text mr="5px">
                              {" "}
                              {item.size.substring(0, 50)}
                              {item.size.length >= 50 ? "..." : null}
                            </Text>
                          </Box>
                        </Stack>
                        <Stack>
                          <Box fontSize="xm">
                            <Text
                              fontWeight="bold"
                              color="#213360"
                              textColor="#FF6B6B"
                              mr="5px"
                            >
                              {" "}
                              {item.price.substring(0, 25)}
                              {item.price.length >= 25 ? "..." : null}
                            </Text>
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                    <Box pb="12px" px="10px" h="40px">
                      {item.Carts.find((item2) => item2["UserId"] === email) ? (
                        <Button
                          disabled
                          w="full"
                          borderRadius="9px"
                          size="sm"
                          my="5px"
                        >
                          <Icon boxSize="4" as={IoCartOutline} mr="5px" x />
                          Keranjang
                        </Button>
                      ) : (
                        <Button
                          onClick={() => onAddCart(item.id)}
                          w="full"
                          borderColor="yellow.400"
                          borderRadius="9px"
                          borderWidth="2px"
                          size="sm"
                          my="5px"
                          _hover={{ bg: "yellow.400", color: "white" }}
                        >
                          <Icon boxSize="4" as={IoCartOutline} mr="5px" />
                          Keranjang
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Stack>
              </>
            );
          })}
        </Flex>
      </Center>

      <Box display="flex" justifyContent="center" alignContent="center">
        <Button
          onClick={() => {
            async function submit() {
              setPage(page === 1 ? 1 : page - 1);
            }
            submit();
            var pageNow = page - 1;
            pageNow = pageNow <= 0 ? 1 : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
          }}
          size="sm"
          m="3px"
          borderColor="yellow.400"
          borderRadius="9px"
          bg="white"
          borderWidth="2px"
          bgColor="inherit"
          _hover={{ bg: "yellow.400" }}
        >
          Sebelumnya
        </Button>
        <Text alignSelf="center" mx="5px">
          {" "}
          {page} of {totalPage}
        </Text>
        <Button
          onClick={() => {
            async function submit() {
              setPage(totalPage === page ? page : page + 1);
            }
            submit();
            var pageNow = page + 1;
            pageNow = pageNow > totalPage ? page : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
          }}
          size="sm"
          m="3px"
          borderColor="yellow.400"
          borderRadius="9px"
          bg="white"
          borderWidth="2px"
          bgColor="inherit"
          _hover={{ bg: "yellow.400" }}
        >
          Selanjutnya
        </Button>
      </Box>
    </div>
  );
}
