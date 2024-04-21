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
  const [passwordNew, setPetpasswordNew] = useState("");
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
        avatar: avatarNew,
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
        console.log("Profile updated successfully");
        setIsUpdateProfileModalOpen(false);
        setIsUserNameModalOpen(false);
        setIsChangeAvatarModalOpen(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
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
                h={"300px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Avatar
                  w={"100%"}
                  h={"100%"}
                  borderRadius={0}
                  src={user.avatar}
                  objectFit={"cover"}
                  onClick={() => setIsChangeAvatarModalOpen(true)}
                />
              </Box>
              <Text textAlign={"center"} fontWeight={"bold"}>
                {user.userName}
              </Text>
              <Text textAlign={"center"} fontWeight={"bold"}>
                {user.email}
              </Text>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                mt={5}
                p={2}
              >
                <button
                  style={{
                    backgroundColor: "#1ec3cd",
                    color: "white",
                    padding: "5px 50px",
                  }}
                  onClick={() => setIsUserNameModalOpen(true)}
                >
                  Update Profile
                </button>
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

      {/* Avatar Model */}
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
              <FormLabel>Avatar Image URL</FormLabel>
              <Input
                placeholder="Enter New Avatar URL"
                onChange={(e) => setAvatarNew(e.target.value)}
                value={avatarNew}
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
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* UserName Model */}
      <Modal
        isOpen={isUserNameModalOpen}
        onClose={() => setIsUserNameModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                value={fullNameNew}
                onChange={(e) => setFullNameNew(e.target.value)}
                placeholder={"Enter Full Name"}
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
              style={{borderBottom:"2px solid #1ec3cd", padding:"10px", outline:"none"}}
                type={showPassword ? "text" : "password"}
                value={passwordNew}
                onChange={(e) => setPetpasswordNew(e.target.value)}
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
