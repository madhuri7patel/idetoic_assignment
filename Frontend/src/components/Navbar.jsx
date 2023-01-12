import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [isAuth, setIsAuth] = useState(false);
  const handleNavigation = () => {
    if (isAuth) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      toast({
        title: "Logout successfully",
        status: "success",
        position: "top-center",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  let storedToken = localStorage.getItem("token");
  useEffect(() => {
    let token = localStorage.getItem("token");
    setIsAuth(token ? true : false);
  }, [storedToken]);
  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      zIndex={"sticky"}
      background={"white"}
    >
      <Box boxShadow={"md"}>
        <Container
          maxWidth={"container.xl"}
          //   border={"1px solid teal"}
          p="20px 20px"
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Link to="/">
              <Flex alignItems={"center"} gap="5px" cursor={"pointer"}>
                <Image
                  src="https://goideotic.com/assets/static/log.fdc08df.5fb0fac2c796c4d12af300d166660b90.png"
                  height={"40px"}
                />
                <Text fontWeight={"bold"} fontSize={"16px"}>
                  Doggo
                </Text>
              </Flex>
            </Link>
            <Flex gap={"10px"}>
              <Flex gap={"10px"} alignItems={"center"}>
                <Button
                  colorScheme="teal"
                  variant={pathname === "/login" ? "solid" : "outline"}
                  onClick={handleNavigation}
                >
                  {isAuth ? "Logout" : "Login"}
                </Button>
                <Button
                  colorScheme="teal"
                  display={isAuth ? "none" : "block"}
                  variant={pathname === "/signup" ? "solid" : "outline"}
                  onClick={() => navigate("/signup")}
                >
                  SignUp
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
