import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const handleIncrement = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDecrement = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId && item.count > 1) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <Box style={{ marginTop: "20px", padding: "20px" }}>
      <Heading padding={5}>Products</Heading>
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows={"repeat(auto, auto)"}
        gap={6}
      >
        {cartItems.map((product) => (
          <GridItem
            key={product._id}
            px={2}
            paddingBottom={20}
            borderRadius="md"
            position="relative"
          >
            <Avatar
              boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
              borderRadius={"none"}
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
            />
            <Box
              p="2"
              boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
              w={"80%"}
              m={"auto"}
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              bg="white"
              borderRadius="md"
            >
              <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                {product.title}
              </p>
              <p>{product.description}</p>
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                ${product.price}
              </p>
              <Box
                width={"100%"}
                borderRadius={6}
                mt="2"
                color={"#fff"}
                fontSize={"25px"}
                fontWeight={700}
                backgroundColor={"teal"}
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Button
                  fontSize={"25px"}
                  colorScheme="none"
                  size="sm"
                  onClick={() => handleDecrement(product._id)}
                >
                  -
                </Button>
                <Text color={"#fff"} display="inline-block" mx={2}>
                  {product.count}
                </Text>
                <Button
                  fontSize={"25px"}
                  colorScheme="none"
                  size="sm"
                  onClick={() => handleIncrement(product._id)}
                >
                  +
                </Button>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Link to="/checkout">
          <Button colorScheme="teal" variant="solid">
            Checkout
          </Button>
        </Link>
      </div>
    </Box>
  );
}