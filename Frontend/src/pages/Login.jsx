import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginCreds({
      ...loginCreds,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`/user/login`, loginCreds)
      .then((r) => {
        console.log("login");
        localStorage.setItem("token", r.data?.token);
        localStorage.setItem("userId", r.data?.userId);
        navigate(state?.pathname || "/");
      })
      .catch((e) => {
        console.log(e?.response?.data);
        toast({
          title: `${e?.response?.data?.message || "Something went wrong"}`,
          status: "error",
          position: "top-center",
          duration: 2000,
          isClosable: true,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
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
        py={4}
        px={4}
        minW={["100%", "md"]}
      >
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Heading
            fontSize={"2xl"}
            textAlign={"center"}
            mb={"15px"}
            mt={"-10px"}
          >
            Sign in
          </Heading>
          <form onSubmit={handleOnSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={loginCreds.email}
                  onChange={handleOnChange}
                  placeholder="Enter email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginCreds.password}
                    onChange={handleOnChange}
                    placeholder="Enter password"
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
              <Stack spacing={10}>
                <Button
                  isLoading={loading}
                  spinnerPlacement="end"
                  loadingText="Singing In..."
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  mt={"30px"}
                >
                  Sign in
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <Text as="span" color={"blue.400"}>
                      Sign Up
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

export default Login;
