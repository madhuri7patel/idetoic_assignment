import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const getDogsName = (data) => {
  let newData = [];
  for (let key in data) {
    newData.push(key);
  }

  return newData;
};

const Home = () => {
  const [dogData, setDogData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dogData.length) {
      axios
        .get("https://dog.ceo/api/breeds/list/all")
        .then((res) => {
          let arr = getDogsName(res.data.message);
          if (arr) {
            setDogData(arr);
            //   console.log(arr);
          }
        })
        .catch(() => {
          console.log("Something went wrong");
        });
    }
  }, [dogData]);
  //   Breakpoint of chakra ui
  // These are the default breakpoints
  //   const breakpoints = {
  //     sm: "30em",
  //     md: "48em",
  //     lg: "62em",
  //     xl: "80em",
  //     "2xl": "96em",
  //   };

  //   // Internally, we transform to this
  //   const breakpoints = ["0em", "30em", "48em", "62em", "80em", "96em"]
  //   const breakpoints = [0 - 479, 480 - 767, 768 - 991, 992 - 1279, 1280 - 1536] in px

  return (
    <Box pt={"50px"} maxWidth={"container.xl"} margin={"auto"}>
      <Heading as={"h2"} textAlign={"center"}>
        List of all dogs
      </Heading>

      {dogData && dogData.length == 0 && (
        <Box mt={"50px"}>
          <Heading textAlign={"center"}>No Result Found</Heading>
        </Box>
      )}

      <Grid
        gridTemplateColumns={[
          "repeat(2,1fr)",
          "repeat(3,1fr)",
          "repeat(4,1fr)",
          "repeat(5,1fr)",
        ]}
        gap={[4, 6]}
        mt={"30px"}
        px={[2, 4]}
      >
        {dogData &&
          dogData.length > 0 &&
          dogData.map((el, i) => (
            <Box
              key={i}
              boxShadow={
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
              }
              rounded={"md"}
              padding={"10px"}
            >
              <Text fontWeight={"bold"} textAlign={"center"}>
                {el}
              </Text>

              <Button
                w={"full"}
                mt={5}
                size={"sm"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={() => navigate(`/details?dogName=${el}`)}
              >
                See Details
              </Button>
            </Box>
          ))}
      </Grid>
    </Box>
  );
};

export default Home;
