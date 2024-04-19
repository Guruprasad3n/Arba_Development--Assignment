import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CategoryEdit from "../Components/CategoryEdit";
import ProductEdit from "../Components/ProductEdit";
import AddCategory from "../Components/AddCategory";
import AddProducts from "../Components/AddProducts";
import TermsAndCondition from "../Components/TermsAndCondition";
export default function MyStore() {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleProductRefresh = () => {
    setRefresh(!refresh);
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        "https://arba-6hjr.onrender.com/api/category/all-categories"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.category);
        setCategoryData(data.category);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const deleteCategory = async (id) => {
    try {
      const response = await fetch(
        `https://arba-6hjr.onrender.com/api/category/delete-category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setCategoryData(categoryData.filter((category) => category._id !== id));
        alert("Category deleted successfully!");
      } else {
        alert("Failed to delete category!");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("An error occurred while deleting category!");
    }
  };
  const fetchProduct = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await fetch(
        `https://arba-6hjr.onrender.com/api/product/user-products/${userId._id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.products);
        setProductData(data.products);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://arba-6hjr.onrender.com/api/product//delete-product/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setProductData(productData.filter((product) => product._id !== id));
        alert("Category deleted successfully!");
      } else {
        alert("Failed to delete category!");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("An error occurred while deleting category!");
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, [refresh]);
  const onUpdateCategory = (updatedCategory) => {
    setCategoryData((prevCategoryData) =>
      prevCategoryData.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
  };
  const onUpdateProduct = (updatedProduct) => {
    setProductData((prevProductData) =>
      prevProductData.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <>
      <Flex mt={10}>
        <Container maxW={"750px"}>
          <Tabs isFitted variant="unstyled">
            <TabList mb="1em">
              <Tab _selected={{ color: "white", bg: "#66B2B2" }}>Category</Tab>
              <Tab _selected={{ color: "white", bg: "#66B2B2" }}>Products</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex gap={2} mb={2}>
                  <button
                    style={{
                      backgroundColor: "#66B2B2",
                      color: "#fff",
                      padding: "4px 20px",
                    }}
                    onClick={handleRefresh}
                  >
                    Refresh
                  </button>
                  <button
                    style={{
                      backgroundColor: "#66B2B2",
                      color: "#fff",
                      padding: "4px 20px",
                    }}
                  >
                    Filter
                  </button>
                  <AddCategory />
                </Flex>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Image</Th>
                      <Th>Name</Th>
                      <Th>Slug</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {categoryData.map((e, i) => (
                      <Tr key={i}>
                        <Td>
                          {e.image ? (
                            <img
                              src={e.image}
                              alt="Category"
                              style={{ height: "30px" }}
                            />
                          ) : (
                            "No Image"
                          )}
                        </Td>
                        <Td>{e.name}</Td>
                        <Td>{e.slug}</Td>
                        <Td>
                          <Flex gap={2} alignItems={"center"}>
                            <CategoryEdit
                              category={e}
                              onUpdate={onUpdateCategory}
                            />
                            {"|"}
                            <button
                              style={{ fontWeight: "bold" }}
                              onClick={() => deleteCategory(e._id)}
                            >
                              Delete
                            </button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TabPanel>
              <TabPanel>
                <Flex gap={2} mb={2}>
                  <button
                    style={{
                      backgroundColor: "#66B2B2",
                      color: "#fff",
                      padding: "4px 20px",
                    }}
                    onClick={handleProductRefresh}
                  >
                    Refresh
                  </button>
                  <button
                    style={{
                      backgroundColor: "#66B2B2",
                      color: "#fff",
                      padding: "4px 20px",
                    }}
                  >
                    Filter
                  </button>

                  <AddProducts />
                </Flex>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Image</Th>
                      <Th>Name</Th>
                      <Th>Slug</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {productData.map((e, i) => (
                      <Tr key={i}>
                        <Td>
                          {e.image ? (
                            <img
                              src={e.image}
                              alt="Category"
                              style={{ height: "30px" }}
                            />
                          ) : (
                            "No Image"
                          )}
                        </Td>
                        <Td>{e.title}</Td>
                        <Td>{e.slug ? "" : e.title}</Td>
                        <Td>
                          <Flex gap={2} alignItems={"center"}>
                            <ProductEdit
                              product={e}
                              onUpdate={onUpdateProduct}
                            />
                            {"|"}
                            <button
                              style={{ fontWeight: "bold" }}
                              onClick={() => deleteProduct(e._id)}
                            >
                              Delete
                            </button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>

      </Flex>
      {localStorage.getItem("termsAccepted") !== "true" && (
       <div style={{display:"none"}}>
         <TermsAndCondition />
       </div>
      )}
    </>
  );
}
