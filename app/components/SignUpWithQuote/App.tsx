import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
// import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'
// import { Rating } from "./Rating";
import { SignUpForm } from "./SignUpForm";

export const App = () => (
  <Box py={{ base: "12", md: "12" }} maxW="7xl" mx="auto">
    <Stack direction="row" spacing="12">
      <Flex flex="1">
        <SignUpForm />
      </Flex>
    </Stack>
  </Box>
);
