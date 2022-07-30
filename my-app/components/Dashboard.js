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
        if (owner === address) {
          continue;
        } else {
          const name = await registeredContract.name();
          const allowed = await registeredContract.allowStatus(address);
          if (allowed == true) {
            const user = await registeredContract.profile(address);
            console.log(user);
            let profile = { name, user };
            profiles.push(profile);
          } else {
            let profile = { name, status: false };
            console.log(profile);
            profiles.push(profile);
          }
        }
      }
      setProfiles(profiles);
    } catch (error) {
      console.log(error);
    }
  };

  const requestAccess = async (e) => {
    try {
      const name = e.target.value;
      const status = await Identi3Contract.registered(address);
      if (status == true) {
        const profileAddress = await Identi3Contract.digitalIdentities(name);
        const registeredAddress = await Identi3Contract.profileToContract(
          profileAddress
        );
        const registeredContract = new Contract(
          registeredAddress,
          RegisterABI,
          signer
        );
        const txn = await registeredContract.requestAccess(address);
        console.log("requesting access");
        await txn.wait();
        console.log("requested");
      } else {
        console.log("not registered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProfiles();
    getRegisteredStatus();
  }, []);

  return (
    // 
    <div>
        
    </div>
  );
}
