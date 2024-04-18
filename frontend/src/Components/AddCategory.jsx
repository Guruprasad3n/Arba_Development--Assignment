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
  import { useRef, useState } from "react";
  
  export default function AddCategory() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
  
    const initialRef = useRef(null);
    const finalRef = useRef(null);
  
    const handleSave = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/category/create-category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, image }),
        });
        const data = await response.json();
        if (response.ok) {
          // Handle success
          console.log("Category created successfully:", data);
          onClose();
        } else {
          // Handle failure
          console.error("Failed to create category:", data.message);
        }
      } catch (error) {
        console.error("Error creating category:", error);
      }
    };
  
    return (
      <>
        <button
          style={{
            backgroundColor: "teal",
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
            <ModalHeader>Create Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Category Image</FormLabel>
                <Input
                  placeholder="Category image URL"
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
  