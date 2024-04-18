import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarouselComponent from "../Components/CarouselComponent";
import { addToCart, removeFromCart } from "../utils/cartUtils";
import { Box, Grid, GridItem, Button, Avatar, Heading } from "@chakra-ui/react";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/product/get-products"
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.products);
          setProducts(data.products.slice(0, 8));
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <CarouselComponent />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Heading padding={5}>Products</Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {products.map((product, index) => (
            <GridItem
              key={index}
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
                {localStorage.getItem("cartItems") &&
                JSON.parse(localStorage.getItem("cartItems")).some(
                  (item) => item._id === product._id
                ) ? (
                  <Box>
                    <Button
                      colorScheme="teal"
                      mt="2"
                      onClick={() => removeFromCart(product._id, setProducts)}
                    >
                      -
                    </Button>
                    <span>
                      {
                        JSON.parse(localStorage.getItem("cartItems")).find(
                          (item) => item._id === product._id
                        ).count
                      }
                    </span>
                    <Button
                      colorScheme="teal"
                      mt="2"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </Button>
                  </Box>
                ) : (
                  <Button
                    colorScheme="teal"
                    mt="2"
                    w={"100%"}
                    onClick={() => addToCart(product, setProducts)}
                  >
                    Add to Cart
                  </Button>
                )}
              </Box>
            </GridItem>
          ))}
        </Grid>
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Link to="/all-products">
            <Button colorScheme="teal" variant="solid">
              Show All Products {">>"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
