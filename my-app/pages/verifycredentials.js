import Navbar from "../components/Navbar";
import Email from "../components/Email";
import Phone from "../components/Phone";
import Aadhaar from "../components/Aadhaar";
import Pan from "../components/Pan";
import { Identi3Address, Identi3ABI } from "../constants/index";
import { useSigner, useProvider, useAccount, useContract } from "wagmi";
import { useEffect, useState } from "react";
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

export default function VerifyCredentials() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const Identi3Contract = useContract({
    addressOrName: Identi3Address,
    contractInterface: Identi3ABI,
    signerOrProvider: signer || provider,
  })
  const { address } = useAccount();
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState("");

  const register = async () => {
    try {
      console.log(name)
      const txn = await Identi3Contract.register(name);
      console.log("registration started");
      await txn.wait();
      console.log("successfully registered");
      getRegisteredStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const getRegisteredStatus = async () => {
    try {
      const status = await Identi3Contract.registered(address);
      console.log(status);
      setRegistered(status);
    } catch (error) {
      console.log(error);
    }
  };

  function renderContent() {
    if (registered) {
      return (
        <div>
          <Email />
          <Phone />
          <Aadhaar />
          <Pan />
        </div>
      );
    } else {
      return (
        <div>
          <Box w="50%" mx="25%" mt="3%">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" onChange={(e)=>{setName(e.target.value)}} />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={register}>
              Register
            </Button>
          </Box>
        </div>
      );
    }
  }

  useEffect(() => {
    getRegisteredStatus();
  }, []);

  return (
    <div>
      <Navbar />
      {renderContent()}
    </div>
  );
}
