import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

export default function Email() {
  return (
    <div>
      <Box w="50%" mx="25%" mt="1%">
        <FormControl>
          <FormLabel>Phone address</FormLabel>
          <Input type="tel" />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit & Verify Phone
        </Button>
      </Box>
    </div>
  );
}
