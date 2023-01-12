import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

const Details = () => {
  const [currentDog, setCurrentDog] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (searchParams.get("dogName")) {
      axios
        .get(
          `https://dog.ceo/api/breed/${searchParams.get(
            "dogName"
          )}/images/random`
        )
        .then((res) => {
          if (res?.data.status === "success") {
            setCurrentDog(res?.data?.message);
            console.log(res.data.message);
          } else {
            toast({
              title: `Something went wrong`,
              status: "error",
              position: "top-center",
              duration: 2000,
              isClosable: true,
            });
          }
        })
        .catch(() => {
          setError(true);
          console.log("Something went wrong");
          toast({
            title: `Something went wrong`,
            status: "error",
            position: "top-center",
            duration: 2000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams.get("dogName")]);

  if (error)
    return (
      <Box
        pt={"50px"}
        maxWidth={"container.xl"}
        margin={"auto"}
        textAlign={"center"}
      >
        Something went wrong
      </Box>
    );

  if (loading) {
    return (
      <Box pt={"50px"} maxWidth={"container.xl"} margin={"auto"}>
        <Grid>
          <Box placeSelf={"center"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        </Grid>
      </Box>
    );
  }

  return (
    <Box pt={"50px"} maxWidth={"container.xl"} margin={"auto"}>
      <Flex justifyContent={"center"} p={2}>
        <Image
          src={currentDog}
          boxSize={["90%", "400px", "500px"]}
          objectFit={"contain"}
          rounded={"md"}
        />
      </Flex>
      <Heading fontSize={"2xl"} textAlign={"center"} mt={"10px"}>
        {searchParams.get("dogName")}
      </Heading>
    </Box>
  );
};

export { Details };
