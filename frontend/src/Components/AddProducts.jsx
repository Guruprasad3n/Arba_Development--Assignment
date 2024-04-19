import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

export default function AddProducts() {
  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [owner, setOwner] = useState("");
  
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://arba-6hjr.onrender.com/api/category/all-categories"
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data.category);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const userId = JSON.parse( localStorage.getItem("userId"));
    if (userId) {
      setOwner(userId);
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://arba-6hjr.onrender.com/api/product/create-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            price,
            category,
            image,
            owner
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Product created successfully:", data);
        onClose();
      } else {
        console.error("Failed to create product:", data.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <button
        style={{
          backgroundColor:"#66B2B2",
          color: "#fff",
          padding: "4px 20px",
        }}
        onClick={onOpen}
      >
        Add
      </button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Product title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Product price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder="Product image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
