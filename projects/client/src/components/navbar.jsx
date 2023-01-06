import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
  Link,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import pesanan from "../assets/pesanan.svg";
import keranjang from "../assets/keranjang.svg";
import user from "../assets/user.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      w={"100px"}
      h={"50px"}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      // _hover={{
      //   bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      // }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Navbar() {
  const { name } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();

  const onlogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    sessionStorage.removeItem("id");
  };

  return (
    <>
      <Box
        bg={useColorModeValue("#ebf5e9")}
        position={"fixed"}
        justifyContent={"center"}
        bottom={0}
      >
        <Container
          as={Stack}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
          position={"relative"}
        >
          <Stack direction={"row"} spacing={6}>
            <>
              <SocialButton label={"Produk"} href={"#"}>
                <Box textAlign={"center"}>
                  <FontAwesomeIcon icon={faHouse} />
                  <Text>Produk</Text>
                </Box>
              </SocialButton>
              <SocialButton label={"Transaksi"} href={"#"}>
                <Box textAlign={"center"}>
                  <Image src={pesanan} margin="auto" />
                  <Text>Transaksi</Text>
                </Box>
              </SocialButton>
              <SocialButton label={"Cart"} href={"#"}>
                <Box textAlign={"center"}>
                  <Image src={keranjang} margin="auto" />
                  <Text>Keranjang</Text>
                </Box>
              </SocialButton>
              <SocialButton label={"Akun"} href={"/register"}>
                <Box textAlign={"center"}>
                  {name ? (
                    <Menu>
                      <MenuButton as={Button}>
                        <Image src={user} margin="auto" />
                        <Text>{name}</Text>
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <Link href="/profile">Profile</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link onClick={onlogout}>Logout</Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <>
                      <SocialButton label={"akun"} href={"/login"}>
                        <Image src={user} margin="auto" />
                        <Text>Akun</Text>
                      </SocialButton>
                    </>
                  )}
                </Box>
              </SocialButton>
            </>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
