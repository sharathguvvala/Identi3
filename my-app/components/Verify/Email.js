import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

export default function Email() {
  return (
    <Box w="50%" mx="25%" mt="3%">
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Submit & Verify Email
      </Button>
    </Box>
  );
}
