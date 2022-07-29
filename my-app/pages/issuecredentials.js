import Navbar from "../components/Navbar";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

export default function IssueCredentials() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  return (
    <div>
      <Navbar />
      <Box my="5%" mx="25%" w="50%">
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Education</FormLabel>
          <Select placeholder="Select country">
            <option>Primary Education</option>
            <option>Secondary Education</option>
            <option>Higher Secondary Education</option>
            <option>Under-Graduate/ Bachelor's level Education</option>
            <option>Post-Graduate/Master's level Education</option>
            <option>Doctoral studies/ Ph.D level Education</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Certificate</FormLabel>
          <Input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </FormControl>
      </Box>
    </div>
  );
}
