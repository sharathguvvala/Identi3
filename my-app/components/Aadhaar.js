import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

export default function Email() {
  return (
    <div>
      <Box w="50%" mx="25%" mt="1%">
        <FormControl>
          <FormLabel>Aadhaar (UIDAI)</FormLabel>
          <Input type="text" />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit Aadhaar
        </Button>
      </Box>
    </div>
  );
}
