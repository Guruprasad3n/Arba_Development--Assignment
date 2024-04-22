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
import { useEffect, useRef, useState } from "react";

export default function ProductEdit({ product, onUpdate }) {
  const [categoryData, setCategoryData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(product.title || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || "");
  const [category, setCategory] = useState(product.category || "");
  const [image, setImage] = useState(product.image || "");

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_KEY}/api/category/all-categories`
      );
      if (response.ok) {
        const data = await response.json();
        setCategoryData(data.category);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSave = async () => {
    try {
      let imageURL = image; // Default to existing image URL
      if (typeof image !== "string") {
        // If image is not a string, it's a file object
        imageURL = await postDetails(image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_KEY}/api/product/update-product/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            price: parseFloat(price),
            category,
            image: imageURL,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        onUpdate(data.product);
        onClose();
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating product!");
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

  useEffect(() => {
    fetchCategory();
  }, []);

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
          <ModalHeader>Edit Product</ModalHeader>
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryData.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
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
//   Select,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useEffect, useRef, useState } from "react";

// export default function ProductEdit({ product, onUpdate }) {
//   const [categoryData, setCategoryData] = useState([]);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [title, setTitle] = useState(product.title || "");
//   const [description, setDescription] = useState(product.description || "");
//   const [price, setPrice] = useState(product.price || "");
//   const [category, setCategory] = useState(product.category || "");
//   const [image, setImage] = useState(product.image || "");

//   const initialRef = useRef(null);
//   const finalRef = useRef(null);

//   const fetchCategory = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_KEY}/api/category/all-categories`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setCategoryData(data.category);
//       } else {
//         throw new Error("Failed to fetch products");
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_KEY}/api/product/update-product/${product._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             title,
//             description,
//             price:parseFloat(price),
//             category,
//             image,
//           }),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         onUpdate(data.product);
//         onClose();
//         alert("Product updated successfully!");
//       } else {
//         alert("Failed to update product!");
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("An error occurred while updating product!");
//     }
//   };
//   useEffect(() => {
//     fetchCategory();
//   }, []);

//   return (
//     <>
//       <button
//         style={{ fontWeight: "bold",  }}
//         onClick={onOpen}
//       >
//         Edit
//       </button>

//       <Modal
//         initialFocusRef={initialRef}
//         finalFocusRef={finalRef}
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Edit Product</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>Title</FormLabel>
//               <Input
//                 ref={initialRef}
//                 placeholder="Product title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Description</FormLabel>
//               <Input
//                 placeholder="Product description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Price</FormLabel>
//               <Input
//                 placeholder="Product price"
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Category</FormLabel>
//               <Select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 {categoryData.map((e) => (
//                   <option key={e._id} value={e._id}>
//                     {e.name}
//                   </option>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Image URL</FormLabel>
//               <Input
//                 placeholder="Product image URL"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//               />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <button
//               style={{color:"#fff", backgroundColor:"#1ec3cd", padding:"6px 30px" }}
//               onClick={handleSave}
//             >
//               Save
//             </button>
//             <button  style={{color:"#fff", backgroundColor:"#1ec3cd", padding:"6px 30px", marginLeft:"20px" }} onClick={onClose}>Cancel</button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
