import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [authTokenAvailable, setAuthTokenAvailable] = useState(false);
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItemCount(cartItems.length);
      setAuthTokenAvailable(true);
      const userId = JSON.parse(localStorage.getItem("userId"));
      if (userId) {
        const userImage = userId.avatar; 
        setUserImage(userImage);
      }
    } else {
      setAuthTokenAvailable(false);
      // navigate("/login");
    }
  }, [navigate]);
  


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("termsAccepted");
    navigate("/login");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box backgroundColor={"#1ec3cd"} py={1} px={7} color={"#fff"}>
              <Link to="/">Logo</Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap={5}>
            <Button as={Link} to={"/cart"}>
              <FaCartShopping fontSize={"1.9rem"}  color="#1ec3cd" />
              {cartItemCount > 0 && (
                <Box
                  bg="green"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                  px={2}
                  rounded="full"
                  ml={-1}
                  mb={6}
                >
                  {cartItemCount}
                </Box>
              )}
            </Button>
            {authTokenAvailable && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                     size={"sm"}
                     src={userImage}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    {" "}
                    <Link to={"/my-store"}>My Store</Link>{" "}
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <Link to={"/profile"}>Profile</Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}