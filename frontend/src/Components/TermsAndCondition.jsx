import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function TermsAndCondition() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [accepted, setAccepted] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem("termsAccepted");
    if (isAccepted === "true" && !cancelled) {
      setAccepted(true);
    } else {
      onOpen();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("termsAccepted", "true");
    setAccepted(true);
    setCancelled(false);
    onClose();
  };

  const handleCancel = () => {
    setCancelled(true);
    onClose();
  };
  const handleOpenModal = () => {
    onOpen();
    localStorage.removeItem("termsAccepted");
  };

  return (
    <>
      <button
        style={{
          backgroundColor: "#1ec3cd",
          color: "white",
          padding: "5px 50px",
        }}
        onClick={handleOpenModal}
      >
        {" "}
        See T&C
      </button>
      {!accepted && (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            style={{
              borderRadius: "0",
              boxSshadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
            }}
          >
            <ModalHeader>TERMS & CONDITIONS</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
                optio, fuga eaque dolore alias pariatur doloribus adipisci,
                eveniet illum, consequatur nostrum neque repellendus commodi
                incidunt porro esse itaque sint magnam magni deleniti reiciendis
                sunt?
              </Text>
              <br />
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
                optio, fuga eaque dolore alias pariatur doloribus adipisci,
                eveniet illum, consequatur nostrum neque repellendus commodi
                incidunt porro esse itaque sint magnam magni deleniti reiciendis
                sunt?
              </Text>
              <br />
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
                optio, fuga eaque dolore alias pariatur doloribus adipisci,
                eveniet illum, consequatur nostrum neque repellendus commodi
                incidunt porro esse itaque sint magnam magni deleniti reiciendis
                sunt?
              </Text>
              <br />
            </ModalBody>

            <Flex
              alignItems={"center"}
              justifyContent={"space-evenly"}
              marginBottom={3}
            >
              <button
                style={{
                  backgroundColor: "#1ec3cd",
                  color: "white",
                  padding: "5px 50px",
                }}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                style={{
                  backgroundColor: "#1ec3cd",
                  color: "white",
                  padding: "5px 50px",
                }}
                onClick={handleAccept}
              >
                Accept
              </button>
            </Flex>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}