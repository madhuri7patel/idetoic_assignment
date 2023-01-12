import React from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`/user/signup`, user)
      .then((r) => {
        toast({
          title: `${r?.data?.message}`,
          status: "success",
          position: "top-center",
          duration: 2000,
          isClosable: true,
        });
        if (r.data.message === "User created successfully") {
          navigate("/login");
        }
      })
      .catch((e) => {
        console.log(e.response.data);
        toast({
          title: `${e?.response?.data?.message || "Something went wrong"}`,
          status: "error",
          position: "top-center",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Flex minH={"93vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        minW={["100%", "md"]}
      >
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Heading
            fontSize={"2xl"}
            textAlign={"center"}
            mb={"15px"}
            mt={"-10px"}
          >
            Sign Up
          </Heading>
          <form onSubmit={handleSignUp}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="fullname"
                  value={user.fullname}
                  onChange={handleOnChange}
                  placeholder={"Enter your full name"}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email </FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleOnChange}
                  placeholder={"Enter email"}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={handleOnChange}
                    placeholder={"Enter password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={loading}
                  spinnerPlacement="end"
                  loadingText="Sigining up..."
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link to="/login">
                    <Text as="span" color={"blue.400"}>
                      Login
                    </Text>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
