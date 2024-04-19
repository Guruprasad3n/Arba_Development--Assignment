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
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";

export default function CategoryEdit({ category, onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setImage(category.image);
    }
  }, [category]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://arba-6hjr.onrender.com/api/category/update-category/${category._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, image }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        onUpdate(data.category);
        onClose();
        alert("Category updated successfully!");
      } else {
        alert("Failed to update category!");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("An error occurred while updating category!");
    }
  };

  return (
    <>
      <button style={{ fontWeight: "bold" }} onClick={onOpen}>
        Edit
      </button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder="Category image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <button
              style={{
                color: "#fff",
                backgroundColor: "#1ec3cd",
                padding: "6px 30px",
              }}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              style={{
                color: "#fff",
                backgroundColor: "#1ec3cd",
                padding: "6px 30px",
                marginLeft: "20px",
              }}
              onClick={onClose}
            >
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
