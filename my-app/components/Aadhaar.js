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
  const [aadhaar, setAadhaar] = useState("");
  const [verified, setVerified] = useState(false);

  const verify = async () => {
    try {
      console.log(aadhaar);
      const registerAddress = await Identi3Contract.profileToContract(address);
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        signer
      );
      const txn = await registeredContract.verifyAadhaar(aadhaar);
      console.log("verification started");
      await txn.wait();
      console.log("verfied");
      await getVerifiedStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const getVerifiedStatus = async () => {
    try {
      const registerAddress = await Identi3Contract.profileToContract(address);
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        provider
      );
      const status = await registeredContract.allowStatus(address);
      console.log(status);
      if (status == true) {
        getAadhaar();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAadhaar = async () => {
    try {
      const registerAddress = await Identi3Contract.profileToContract(address);
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        provider
      );
      const aadhaar = await registeredContract.getAadhaar(address);
      console.log(aadhaar);
      setAadhaar(aadhaar);
      if (aadhaar !== "") {
        setVerified(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function renderContent() {
    if (verified) {
      return (
        <div>
          <Box w="50%" mx="25%" mt="1%">
            <FormControl>
              <FormLabel>Aadhaar (UIDAI)</FormLabel>
              <Input type="text" readOnly placeholder={aadhaar} />
            </FormControl>
          </Box>
        </div>
      );
    } else {
      return (
        <div>
          <Box w="50%" mx="25%" mt="1%">
            <FormControl>
              <FormLabel>Aadhaar (UIDAI)</FormLabel>
              <Input type="text" onChange={(e)=>{setAadhaar(e.target.value)}} />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={verify}>
              Submit Aadhaar
            </Button>
          </Box>
        </div>
      );
    }
  }

  useEffect(() => {
    getVerifiedStatus();
  }, []);

  return <div>{renderContent()}</div>;
}
