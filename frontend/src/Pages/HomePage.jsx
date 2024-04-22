import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarouselComponent from "../Components/CarouselComponent";
import { addToCart, removeFromCart } from "../utils/cartUtils";
import { Box, Grid, GridItem, Button, Avatar, Heading } from "@chakra-ui/react";
import TermsAndCondition from "../Components/TermsAndCondition";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId"));
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_KEY}/api/product/user-products/${userId._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products.slice(0, 8));
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
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
                // borderRadius="md"
                overflow="hidden"
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.title}
                </p>
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.description}
                </p>
                <p
                  style={{
                    marginTop: "10px",
                    color: "#1ec3cd",
                    marginBottom: "4px",
                  }}
                >
                  RS. {product.price}
                </p>
                {localStorage.getItem("cartItems") &&
                JSON.parse(localStorage.getItem("cartItems")).some(
                  (item) => item._id === product._id
                ) ? (
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
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                      onClick={() => removeFromCart(product._id, setProducts)}
                    >
                      -
                    </button>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {
                        JSON.parse(localStorage.getItem("cartItems")).find(
                          (item) => item._id === product._id
                        ).count
                      }
                    </span>
                    <button
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                      onClick={() => addToCart(product, setProducts)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    style={{
                      backgroundColor: "#1ec3cd",
                      color: "#fff",
                      padding: "4px 10px",
                      width: "100%",
                    }}
                    onClick={() => addToCart(product, setProducts)}
                  >
                    Add to Cart
                  </button>
                )}
              </Box>
            </GridItem>
          ))}
        </Grid>
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Link to="/all-products">
            <button
              style={{
                backgroundColor: "#1ec3cd",
                color: "#fff",
                padding: "4px 10px",
              }}
            >
              Show All Products {">>"}
            </button>
          </Link>
        </div>
      </div>
      {localStorage.getItem("termsAccepted") !== "true" && (
        <div style={{ display: "none" }}>
          <TermsAndCondition />
        </div>
      )}
    </div>
  );
}
