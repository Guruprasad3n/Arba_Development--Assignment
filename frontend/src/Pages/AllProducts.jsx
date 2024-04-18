import { Avatar, Box, Button, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";

export default function AllProducts() {
  const [allProducts, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/product/get-products?page=${currentPage}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProducts(data.products);
          setTotalPages(data.totalPages);
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
  }, [currentPage, navigate]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item._id === product._id ? { ...item, count: item.count + 1 } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    } else {
      const updatedItems = [...cartItems, { ...product, count: 1 }];
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    }
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.map((item) =>
      item._id === productId ? { ...item, count: item.count - 1 } : item
    );
    setCartItems(updatedItems.filter((item) => item.count > 0));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedItems.filter((item) => item.count > 0))
    );
  };

  return (
    <>
      <Box style={{ marginTop: "20px" }}>
        <Heading padding={5}>Products</Heading>
        <Grid
          templateColumns="repeat(4, 1fr)"
          templateRows={"repeat(auto, auto)"}
          gap={6}
        >
          {allProducts.map((product, index) => (
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
                {cartItems.find((item) => item._id === product._id) ? (
                  <Box
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
                      colorScheme="none"
                      fontSize={"25px"}
                      fontWeight={700}
                      // mt="2"
                      onClick={() => removeFromCart(product._id)}
                    >
                      -
                    </Button>
                    <span>
                      {cartItems.find((item) => item._id === product._id).count}
                    </span>
                    <Button
                      fontSize={"25px"}
                      fontWeight={700}
                      colorScheme="none"
                      // mt="2"
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
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                )}
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
