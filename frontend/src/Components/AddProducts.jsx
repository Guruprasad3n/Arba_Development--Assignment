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

export default function AddProducts({ handleProductRefresh }) {
  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_KEY}/api/category/all-categories`
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
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setOwner(userId);
    }
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      const imageURL = await postDetails(image);
      console.log("imageURL", imageURL);
      console.log("image", image);
      const productData = {
        title,
        description,
        price,
        category,
        image: imageURL,
        owner,
      };

      const response = await fetch(
        `${import.meta.env.VITE_KEY}/api/product/create-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Product created successfully:", data);
        handleProductRefresh();
        onClose();
      } else {
        console.error("Failed to create product:", data.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setLoading(false);
    }
  };

  const postDetails = async (image) => {
    setLoading(false);
    if (!image) {
      return null; // Return null if no image is selected
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "arba-dev");
      data.append("cloud_name", "dreyat4ae");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dreyat4ae/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setImage(responseData.url.toString());
          return responseData.url.toString();
        } else {
          console.error("Failed to upload image to Cloudinary");
          setLoading(false);
          return null;
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        setLoading(false);
        return null;
      }
    } else {
      console.error("Image type must be either JPEG or PNG");
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <button
        style={{
          backgroundColor: "#1ec3cd",
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
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleSave();
              }}
              isLoading={loading}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
