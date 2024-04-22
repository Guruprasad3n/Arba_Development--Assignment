import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import TermsAndCondition from "../Components/TermsAndCondition";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isChangeAvatarModalOpen, setIsChangeAvatarModalOpen] = useState(false);
  const [passwordNew, setPasswordNew] = useState("");
  const [fullNameNew, setFullNameNew] = useState("");
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
    useState(false);
  const [isUserNameModalOpen, setIsUserNameModalOpen] = useState(false);
  const [avatarNew, setAvatarNew] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userId = JSON.parse(localStorage.getItem("userId"));

      try {
        const response = await fetch(
          `${import.meta.env.VITE_KEY}/api/user/${userId._id}`
        );
        const data = await response.json();
        const userData = data;

        if (response.ok) {
          setUser(data.user);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("Authentication token not found");
        return;
      }

      const updatedProfileData = {
        fullName: fullNameNew,
        newPassword: passwordNew,
      };

      const response = await fetch(
        `${import.meta.env.VITE_KEY}/api/user/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
          body: JSON.stringify(updatedProfileData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        alert("Profile updated successfully");
        setIsUpdateProfileModalOpen(false);
        setIsUserNameModalOpen(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "arba-dev");
      data.append("cloud_name", "dreyat4ae");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dreyat4ae/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      setAvatarNew(responseData.url.toString());
      e.target.value = null;
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };
  const handleAvatarSubmit = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("Authentication token not found");
        return;
      }

      const updatedAvatarData = {
        avatar: avatarNew,
      };
      console.log("updatedAvatarDataNew", updatedAvatarData);
      const response = await fetch(
        `${import.meta.env.VITE_KEY}/api/user/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
          body: JSON.stringify(updatedAvatarData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        console.log("Avatar updated successfully");
        setIsChangeAvatarModalOpen(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };
  useEffect(()=>{
  

    if (avatarNew) {
      handleAvatarSubmit();
    }
  },[avatarNew])

  return (
    <>
      <Heading paddingX={10} paddingY={3}>
        Profile Page
      </Heading>
      <Flex>
        <Container maxW={"xl"} p={5}>
          {user ? (
            <>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                textAlign={"center"}
              >
                <Box
                  position={"relative"}
                  onClick={() => setIsChangeAvatarModalOpen(true)}
                >
                  <Text
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bg={"rgba(0,0,0,0.5)"}
                    color={"white"}
                    py={1}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    width={"100%"}
                    zIndex={1}
                  >
                    {user.fullName}
                  </Text>
                  <Avatar
                    w={"300px"}
                    h={"300px"}
                    borderRadius={0}
                    src={user.avatar}
                    objectFit={"cover"}
                  />
                </Box>
                <Text fontWeight={"bold"} mt={3}>
                  {user.userName}
                </Text>
                <Text fontWeight={"bold"} mt={3}>
                  {user.email}
                </Text>
                <Box mt={3}>
                  <button
                    style={{
                      backgroundColor: "#1ec3cd",
                      color: "white",
                      padding: "10px 50px",
                      borderRadius: "0px",
                      border: "none",
                      outline: "none",
                    }}
                    onClick={() => setIsUserNameModalOpen(true)}
                  >
                    Update Profile
                  </button>
                </Box>
              </Box>
            </>
          ) : (
            <Text>Loading user data...</Text>
          )}
        </Container>
      </Flex>
      <Divider m={5} />

      <Container
        maxW={"xl"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={10}
      >
        <TermsAndCondition />
        <button
          style={{
            backgroundColor: "#1ec3cd",
            color: "white",
            padding: "5px 50px",
          }}
          onClick={() => setIsUpdateProfileModalOpen(true)}
        >
          Change Password
        </button>
      </Container>

      {/* Avatar Modal */}
      <Modal
        isOpen={isChangeAvatarModalOpen}
        onClose={() => setIsChangeAvatarModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Avatar Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </FormControl>
            <Button
              borderRadius={0}
              backgroundColor={"#1ec3cd"}
              color={"#fff"}
              mt={4}
              onClick={handleAvatarSubmit}
            >
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* UserName Modal */}
      <Modal
        isOpen={isUserNameModalOpen}
        onClose={() => setIsUserNameModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {user && (
              <>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    defaultValue={user.fullName}
                    type="text"
                    onChange={(e) => setFullNameNew(e.target.value)}
                    placeholder={"Enter Full Name"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    disabled
                    type="text"
                    defaultValue={user.userName}
                    placeholder="Enter Username"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    disabled
                    type="email"
                    defaultValue={user.email}
                    placeholder="Enter Email"
                  />
                </FormControl>
                <Button
                  borderRadius={0}
                  backgroundColor={"#1ec3cd"}
                  color={"#fff"}
                  mt={4}
                  onClick={handleUpdateProfile}
                >
                  Submit
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Password Model */}
      <Modal
        isOpen={isUpdateProfileModalOpen}
        onClose={() => setIsUpdateProfileModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>New Password</FormLabel>
              <input
                style={{
                  borderBottom: "2px solid #1ec3cd",
                  padding: "10px",
                  outline: "none",
                }}
                type={showPassword ? "text" : "password"}
                value={passwordNew}
                onChange={(e) => setPasswordNew(e.target.value)}
                placeholder={"Enter Password"}
              />
              <IconButton
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={handleTogglePasswordVisibility}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
                position="absolute"
                right="160px"
                top="72%"
                transform="translateY(-50%)"
                backgroundColor={"none"}
              />
            </FormControl>
            <Button
              borderRadius={0}
              mt={4}
              onClick={handleUpdateProfile}
              backgroundColor={"#1ec3cd"}
              color={"#fff"}
            >
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
