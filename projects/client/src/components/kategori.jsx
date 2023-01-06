import {
  Box,
  IconButton,
  Stack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";

import produk from "../assets/semua_produk.png";
import sayuran from "../assets/sayuran.png";
import daging from "../assets/daging.png";
import buah from "../assets/buah.png";
import ikan from "../assets/ikan.png";
import unggas from "../assets/ayam.png";
import minuman from "../assets/minuman.png";
import camilan from "../assets/camilan.png";
import sembako from "../assets/sembako.png";
import kebersihan from "../assets/kebersihan.png";

export default function Kategori() {
  return (
    <>
      <Box
        bg={useColorModeValue("white")}
        mt="3"
        position={"relative"}
        height="auto"
        width="auto"
        justifyContent="center"
        borderTopRadius={15}
        borderBottomRadius={15}
      >
        <Stack direction="column">
          <Wrap
            marginTop={3}
            spacing={10}
            marginLeft={"9%"}
            marginRight={"9%"}
            marginBottom={3}
          >
            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={produk} />}
                />
              </WrapItem>
              Produk
            </Box>

            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={sayuran} />}
                />
              </WrapItem>
              Sayur
            </Box>

            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={daging} />}
                />
              </WrapItem>
              Daging
            </Box>

            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={unggas} />}
                />
              </WrapItem>
              Unggas
            </Box>

            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={ikan} />}
                />
              </WrapItem>
              Makanan Laut
            </Box>

            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={buah} />}
                />
              </WrapItem>
              Buah
            </Box>

            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={minuman} />}
                />
              </WrapItem>
              Minuman
            </Box>

            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={camilan} />}
                />
              </WrapItem>
              Camilan
            </Box>

            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={sembako} />}
                />
              </WrapItem>
              Sembako
            </Box>

            <Box
              textAlign={"center"}
              margin={"auto"}
              width={"50px"}
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <WrapItem>
                <IconButton
                  width="50px"
                  height="50px"
                  isRound="true"
                  icon={<Image src={kebersihan} />}
                />
              </WrapItem>
              Alat Mandi
            </Box>
          </Wrap>
        </Stack>
      </Box>
    </>
  );
}
