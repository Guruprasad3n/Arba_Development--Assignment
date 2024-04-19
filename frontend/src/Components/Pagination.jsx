import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <Flex justifyContent="center" alignItems="center" mt={4}>
      <Button
       borderRadius={0}
       backgroundColor={"#1ec3cd"}
       color={"#fff"}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        mr={2}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <Button
          key={number}
          variant={number === currentPage ? "solid" : "outline"}
          colorScheme="#1ec3cd"
          onClick={() => onPageChange(number)}
          mx={1}
        >
          {number}
        </Button>
      ))}
      <Button
        borderRadius={0}
        backgroundColor={"#1ec3cd"}
        color={"#fff"}
        disabled={currentPage === totalPages-1}
        onClick={() => onPageChange(currentPage + 1)}
        ml={2}
      >
        Next
      </Button>
    </Flex>
  );
}
