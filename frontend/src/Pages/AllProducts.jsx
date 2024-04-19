import { Avatar, Box, Button, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";
import TermsAndCondition from "../Components/TermsAndCondition";

export default function AllProducts() {
  const [allProducts, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cartItems, setCartItems] = useState([]);
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
          `http://localhost:8000/api/product/user-products/${userId._id}?page=${currentPage}`
        );
        if (response.ok) {
          const data = await response.json();
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
    // if (!authToken) {
    //   navigate("/login");
    // }
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
    const filteredItems = updatedItems.filter((item) => item.count > 0);
    setCartItems(filteredItems);
    localStorage.setItem("cartItems", JSON.stringify(filteredItems));
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
                    color: "teal",
                    marginBottom: "4px",
                  }}
                >
                  RS. {product.price}
                </p>
                {cartItems.find((item) => item._id === product._id) ? (
                  <Box
                    mt="2"
                    color={"#fff"}
                    fontSize={"25px"}
                    fontWeight={700}
                    backgroundColor={"#66B2B2"}
                    display={"flex"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                  >
                    <button
                      style={{ color: "#fff", fontWeight: "700" }}
                      onClick={() => removeFromCart(product._id)}
                    >
                      -
                    </button>
                    <span>
                      {cartItems.find((item) => item._id === product._id).count}
                    </span>
                    <button
                      style={{ color: "#fff", fontWeight: "700" }}
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </Box>
                ) : (
                  <button
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      backgroundColor: "#66B2B2",
                      width: "100%",
                      padding: "4px 0px",
                    }}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
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
    {localStorage.getItem("termsAccepted") !== "true" && (
       <div style={{display:"none"}}>
         <TermsAndCondition />
       </div>
      )}
    </>
  );
}
