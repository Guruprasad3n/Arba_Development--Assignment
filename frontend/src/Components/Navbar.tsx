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
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const response = await fetch("/api/cart/count");
        if (response.ok) {
          const data = await response.json();
          setCartItemCount(data.count);
        } else {
          throw new Error("Failed to fetch cart item count");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItemCount();
  }, []);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* - */}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap={5}>
            <Button>
              <FaCartShopping />
              {/* Display cart item count */}
              {cartItemCount > 0 && (
                <Box
                  bg="red.400"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                  px={2}
                  rounded="full"
                  ml={-3}
                >
                  {cartItemCount}
                </Box>
              )}
            </Button>
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
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  {" "}
                  <Link to={"/my-store"}>My Store</Link>{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to={"/my-store"}>Profile</Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  {" "}
                  <Link to={"/my-store"}>Logout</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
