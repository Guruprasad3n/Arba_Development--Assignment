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
import TermsAndCondition from "../Components/TermsAndCondition";

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
    const updatedCartItems = cartItems
      .map((item) => {
        if (item._id === productId) {
          if (item.count === 1) {
            return null;
          } else {
            return { ...item, count: item.count - 1 };
          }
        }
        return item;
      })
      .filter(Boolean);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <Box style={{ marginTop: "20px", padding: "20px" }}>
      <Heading padding={5}>Products</Heading>
      {cartItems.length === 0 ? (
        <Text textAlign="center" fontSize="xl">
          No products in the cart. <Link to="/">Shop Now</Link>
        </Text>
      ) : (
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
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
              >
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {product.title}
                </p>
                <p>{product.description}</p>
                <p style={{ marginTop: "10px", color: "teal" }}>
                  RS. {product.price}
                </p>
                <div
                  style={{
                    backgroundColor: "#1ec3cd",
                    color: "#fff",
                    padding: "4px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <button
                    style={{ fontWeight: "700", fontSize: "20px" }}
                    onClick={() => handleDecrement(product._id)}
                  >
                    -
                  </button>
                  <Text
                    fontWeight={700}
                    color={"#fff"}
                    display="inline-block"
                    mx={2}
                  >
                    {product.count}
                  </Text>
                  <button
                    style={{ fontWeight: "700", fontSize: "20px" }}
                    onClick={() => handleIncrement(product._id)}
                  >
                    +
                  </button>
                </div>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
      {cartItems.length > 0 && (
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Link to="/checkout">
            <button
              style={{
                backgroundColor: "#1ec3cd",
                padding: "4px 50px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Checkout
            </button>
          </Link>
        </div>
      )}
      {localStorage.getItem("termsAccepted") !== "true" && (
        <div style={{ display: "none" }}>
          <TermsAndCondition />
        </div>
      )}
    </Box>
  );
}
