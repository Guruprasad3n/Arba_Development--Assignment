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

export default function AddCategory({ handleProductRefresh }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleSave = async () => {
    try {
      let imageURL = image; // Default to existing image URL
      if (typeof image !== "string") {
        // If image is not a string, it's a file object
        imageURL = await postDetails(image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_KEY}/api/category/create-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, image: imageURL }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Category created successfully:", data);
        handleProductRefresh();
        onClose();
      } else {
        console.error("Failed to create category:", data.message);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const postDetails = async (image) => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "arba-dev");
      data.append("cloud_name", "dreyat4ae");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dreyat4ae/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const responseData = await response.json();
      return responseData.url.toString();
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

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
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
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






// import {
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useRef, useState } from "react";

// export default function AddCategory({ handleProductRefresh }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [name, setName] = useState("");
//   const [image, setImage] = useState("");

//   const initialRef = useRef(null);
//   const finalRef = useRef(null);

//   const handleSave = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_KEY}/api/category/create-category`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name, image }),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         console.log("Category created successfully:", data);
//         handleProductRefresh();
//         onClose();
//       } else {
//         console.error("Failed to create category:", data.message);
//       }
//     } catch (error) {
//       console.error("Error creating category:", error);
//     }
//   };

//   return (
//     <>
//       <button
//         style={{
//           backgroundColor: "#1ec3cd",
//           color: "#fff",
//           padding: "4px 20px",
//         }}
//         onClick={onOpen}
//       >
//         Add
//       </button>
//       <Modal
//         initialFocusRef={initialRef}
//         finalFocusRef={finalRef}
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Create Category</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>Category Name</FormLabel>
//               <Input
//                 ref={initialRef}
//                 placeholder="Category name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Category Image</FormLabel>
//               <Input
//                 placeholder="Category image URL"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//               />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <button
//               style={{
//                 color: "#fff",
//                 backgroundColor: "#1ec3cd",
//                 padding: "6px 30px",
//               }}
//               onClick={handleSave}
//             >
//               Save
//             </button>
//             <button
//               style={{
//                 color: "#fff",
//                 backgroundColor: "#1ec3cd",
//                 padding: "6px 30px",
//                 marginLeft: "20px",
//               }}
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
