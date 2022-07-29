import Navbar from "../components/Navbar";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export default function VerifyCredentials() {
  return (
    <div>
      <Navbar />
      <Box w="50%" mx="25%" mt="3%">
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
        >
          Submit & Verify Email
        </Button>
      </Box>
      <Box w="50%" mx="25%" mt="1%">
        <FormControl>
          <FormLabel>Phone address</FormLabel>
          <Input type="tel" />
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
        >
          Submit & Verify Phone
        </Button>
      </Box>
      <Box w="50%" mx="25%" mt="1%">
        <FormControl>
          <FormLabel>Aadhaar (UIDAI)</FormLabel>
          <Input type="text" />
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
        >
          Submit Aadhaar
        </Button>
      </Box>
      <Box w="50%" mx="25%" mt="1%">
        <FormControl>
          <FormLabel>Pan</FormLabel>
          <Input type="text" />
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
        >
          Submit Pan
        </Button>
      </Box>
    </div>
  );
}
