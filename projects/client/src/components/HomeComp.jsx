import React from "react";
import {
  Box,
  useBreakpointValue,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { useState } from "react";
import soda from "../assets/soda.png";
import bigSale from "../assets/bigsale.png";
import sale from "../assets/super.png";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function HomeComp() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  // These are the images used in the slide
  const cards = [soda, sale, bigSale];

  return (
    <>
      <Center>
        <Box
          bg={useColorModeValue("#ebf5e9")}
          mt="5"
          // display={{ base: "none", md: "block" }}
          position={"relative"}
          height="200px"
          width="468px"
          justifyContent="center"
          borderTopRadius={15}
          borderBottomRadius={15}
        >
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {cards.map((url, index) => (
              <Box
                key={index}
                height="200px"
                borderRadius="2xl"
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`url(${url})`}
              />
            ))}
          </Slider>
        </Box>
      </Center>
    </>
  );
}
