import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Identi3Address, Identi3ABI, RegisterABI } from "../constants/index";
import { useSigner, useProvider, useAccount, useContract } from "wagmi";
import { useEffect, useState } from "react";
import { Contract } from "ethers";

export default function Email() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const Identi3Contract = useContract({
    addressOrName: Identi3Address,
    contractInterface: Identi3ABI,
    signerOrProvider: signer || provider,
  });
  const { address } = useAccount();
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);

  const verify = async () => {
    try {
      const registerAddress = await Identi3Contract.profileToContract(
        msg.sender
      );
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        signer
      );
      const txn = await registeredContract.verifyEmail(email);
      console.log("verification started");
      await txn.wait();
      console.log("verfied");
    } catch (error) {
      console.log(error);
    }
  };

  const getVerifiedSstatus = async () => {
    try {
      const registerAddress = await Identi3Contract.profileToContract(
        msg.sender
      );
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        provider
      );
      const status = await registeredContract.emailVerified();
      console, log(status);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmail = async () => {
    try {
      const registerAddress = await Identi3Contract.profileToContract(
        msg.sender
      );
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        provider
      );
      const email = registeredContract.getEmail();
      setEmail(email);
    } catch (error) {
      console.log(error)
    }
  }

  function renderButton() {
    if (verified) {
      return (
        <div>
          <Box w="50%" mx="25%" mt="3%">
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" readOnly value={email} />
            </FormControl>
          </Box>
        </div>
      );
    }
  }

  useEffect(() => {
    getVerifiedSstatus();
  }, []);

  return (
    <Box w="50%" mx="25%" mt="3%">
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        onChange={(e) => {
          setEmail(e);
        }}
        onClick={verify}
      >
        Submit & Verify Email
      </Button>
    </Box>
  );
}
