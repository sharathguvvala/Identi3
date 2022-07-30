import {
  Box,
  Wrap,
  WrapItem,
  Center,
  Button,
  Badge,
  Text,
} from "@chakra-ui/react";
import { Identi3Address, Identi3ABI, RegisterABI } from "../constants/index";
import { useSigner, useProvider, useAccount, useContract } from "wagmi";
import { useEffect, useState } from "react";
import { Contract } from "ethers";

export default function Dashboard() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const Identi3Contract = useContract({
    addressOrName: Identi3Address,
    contractInterface: Identi3ABI,
    signerOrProvider: signer || provider,
  });
  const { address } = useAccount();
  const [registered, setRegistered] = useState(false);
  const [profiles, setProfiles] = useState("");

  const getRegisteredStatus = async () => {
    try {
      const status = await Identi3Contract.registered(address);
      console.log(status);
      setRegistered(status);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProfiles = async () => {
    try {
      const count = await Identi3Contract.didIds();
      let profiles = [];
      for (var i = 0; i < count; i++) {
        const registeredAddress = await Identi3Contract.allRegisteredAddresses(
          i
        );
        console.log(registeredAddress);
        const registeredContract = new Contract(
          registeredAddress,
          RegisterABI,
          provider
        );
        const owner = await registeredContract.owner();
        if(owner === address) {
            continue;
        }
        const name = await registeredContract.name();
        const allowed = await registeredContract.allowStatus(address);
        if (allowed == true) {
          const email = await getEmail(registeredAddress);
          const phone = await getPhone(registeredAddress);
          const aadhaar = await getAadhaar(registeredAddress);
          const pan = await getPan(registeredAddress);
          let profile = { name, email, phone, aadhaar, pan, status: true };
          console.log(profile);
          profiles.push(profile);
        } else {
          let profile = { name, status: false };
          console.log(profile);
          profiles.push(profile);
        }
      }
      setProfiles(profiles);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmail = async (registeredAddress) => {
    try {
      const registeredContract = new Contract(
        registeredAddress,
        RegisterABI,
        provider
      );
      const email = await registeredContract.getEmail(address);
      console.log(email);
      return email;
    } catch (error) {
      console.log(error);
    }
  };

  const getPhone = async (registeredAddress) => {
    try {
      const registeredContract = new Contract(
        registeredAddress,
        RegisterABI,
        provider
      );
      const phone = await registeredContract.getPhone(address);
      console.log(phone);
      return phone;
    } catch (error) {
      console.log(error);
    }
  };

  const getAadhaar = async (registeredAddress) => {
    try {
      const registeredContract = new Contract(
        registeredAddress,
        RegisterABI,
        provider
      );
      const aadhaar = await registeredContract.getAadhaar(address);
      console.log(aadhaar);
      return aadhaar;
    } catch (error) {
      console.log(error);
    }
  };

  const getPan = async (registeredAddress) => {
    try {
      const registeredContract = new Contract(
        registeredAddress,
        RegisterABI,
        provider
      );
      const pan = await registeredContract.getPan(address);
      console.log(pan);
      return pan;
    } catch (error) {
      console.log(error);
    }
  };

  const requestAccess = async (e) => {
    try {
        const name = e.target.value;
        const status = await Identi3Contract.registered(address);
        if(status == true) {
            const profileAddress = await Identi3Contract.digitalIdentities(name);
            const registeredAddress = await Identi3Contract.profileToContract(profileAddress);
            const registeredContract = new Contract(
                registeredAddress,
                RegisterABI,
                provider
              );
              const txn = await registeredContract.requestAccess(address);
              console.log("requesting access");
              await txn.wait();
              console.log("requested");
        }
        else {
            console.log("not registered")
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getAllProfiles();
    getRegisteredStatus();
  }, []);

  return (
    <div>
      <Box mx="15%" my="5%">
        {profiles && registered ? (
          <Wrap spacing="70px">
            {profiles.map((profile, index) => {
              return (
                <WrapItem key={index} w="500px" h="150px" bg="gray.100">
                  <Center pl="10%"> 
                    {profile.status == false ? (
                      <div>
                        <Badge colorScheme="green">Access</Badge>
                        <div class="flex flex-col">
                            <Text>{profile.name}</Text>
                            <Text>{profile.name}</Text>
                            <Text>{profile.name}</Text>
                            <Text>{profile.name}</Text>
                            <Text>{profile.name}</Text>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Badge colorScheme="purple">No Access</Badge>
                        <div class="flex flex-col">
                            <Text>{profile.name}</Text>
                        </div>
                        <Box>
                          <Button mt={4} colorScheme="teal" onClick={(e)=>requestAccess(e)} value={profile.name}>
                            Request Access
                          </Button>
                        </Box>
                      </div>
                    )}
                  </Center>
                </WrapItem>
              );
            })}
          </Wrap>
        ) : (
          <div>
            <Box w="10%" mx="45%" mt="5%">
              <Button mt={4} colorScheme="teal">
                Register
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </div>
  );
}
