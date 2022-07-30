import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
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
    })
    const { address } = useAccount();
    const [registered, setRegistered] = useState(false);

    const getAllProfiles = async () => {
        try {
            const count = await Identi3Contract.didIds();
            for(var i=0; i<count; i++) {
                const registeredAddresses = await Identi3Contract.allRegisteredAddresses(i);
                console.log(registeredAddresses)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={getAllProfiles}>get</button>
        </div>
    )
}