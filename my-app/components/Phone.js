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
  const [phone, setPhone] = useState("");
  const [verified, setVerified] = useState(false);

  const verify = async () => {
    try {
      console.log(phone);
      const registerAddress = await Identi3Contract.profileToContract(address);
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        signer
      );
      const txn = await registeredContract.verifyPhone(phone);
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
        getPhone();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPhone = async () => {
    try {
      const registerAddress = await Identi3Contract.profileToContract(address);
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        provider
      );
      const phone = await registeredContract.getPhone(address);
      console.log(phone);
      setPhone(phone);
      if (phone !== "") {
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
              <FormLabel>Phone address</FormLabel>
              <Input type="tel" readOnly placeholder={phone} />
            </FormControl>
          </Box>
        </div>
      );
    } else {
      return (
        <div>
          <Box w="50%" mx="25%" mt="1%">
            <FormControl>
              <FormLabel>Phone address</FormLabel>
              <Input type="tel" onChange={(e)=>{setPhone(e.target.value)}} />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={verify}>
              Submit & Verify Phone
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
