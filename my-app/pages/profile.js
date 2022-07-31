import Navbar from "../components/Navbar";
import { Box, Button, List, ListItem } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Identi3Address, Identi3ABI, RegisterABI } from "../constants/index";
import { useSigner, useProvider, useAccount, useContract } from "wagmi";
import { useEffect, useState } from "react";
import { Contract } from "ethers";

export default function Profile() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const Identi3Contract = useContract({
    addressOrName: Identi3Address,
    contractInterface: Identi3ABI,
    signerOrProvider: signer || provider,
  });
  const { address } = useAccount();
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState("");
  const [profile, setProfile] =  useState("");
  const [requests, setRequests] = useState("");

  const getRegisteredStatus = async () => {
    try {
      const status = await Identi3Contract.registered(address);
      console.log(status);
      setRegistered(status);
      if (status == true) {
        await getName();
        await getProfile();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const registerAddress = await Identi3Contract.profileToContract(address);
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        provider
      );
      const profile = await registeredContract.profile(address);
      console.log(profile)
      setProfile(profile);
    } catch (error) {
      console.log(error)
    }
  }

  const getName = async () => {
    try {
      const registerAddress = await Identi3Contract.profileToContract(address);
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        provider
      );
      const name = await registeredContract.name();
      console.log(name);
      setName(name);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequests = async () => {
    try {
      const registerAddress = await Identi3Contract.profileToContract(address);
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        provider
      );
      const count = await registeredContract.requests();
      var requests = [];
      for (var i = 0; i < count; i++) {
        const address = await registeredContract.accessRequests(i);
        console.log(address);
        requests.push(address);
      }
      setRequests(requests);
    } catch (error) {
      console.log(error);
    }
  };

  const approve = async (requestAddress) => {
    try {
      console.log(requestAddress)
      const registerAddress = await Identi3Contract.profileToContract(address);
      const registeredContract = new Contract(
        registerAddress,
        RegisterABI,
        signer
      );
      const txn = await registeredContract.addParty(requestAddress);
      console.log("started approval");
      await txn.wait();
      console.log("approved");
    } catch (error) {
      console.log(error);
    }
  };

  function renderContent() {
    if (registered) {
      return (
        <div>
          <Box w="50%" mx="25%" mt="3%">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and status.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Name (DID)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {name}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {profile.email}
                      {profile.email ? (
                        <CheckCircleIcon ml="1%" />
                      ) : (
                        <div>Email not provided!</div>
                      )}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {profile.phone}
                      {profile.phone ? (
                        <CheckCircleIcon ml="1%" />
                      ) : (
                        <div>Phone not provided!</div>
                      )}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Aadhaar (UIDAI)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {profile.aadhaar}
                      {profile.aadhaar ? (
                        <CheckCircleIcon ml="1%" />
                      ) : (
                        <div>Aadhaar not provided!</div>
                      )}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">PAN</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {profile.pan}
                      {profile.pan ? (
                        <CheckCircleIcon ml="1%" />
                      ) : (
                        <div>PAN not provided!</div>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Box>
          <Box w="50%" mx="25%" mt="3%">
            <h3>
              <b>Requests</b>
            </h3>
            {requests ? (
              <List>
                {requests.map((request, index) => {
                  return (
                    <div className="flex flex-row">
                      <ListItem key={index} mt="3%">
                        {request}
                      </ListItem>
                      <Button
                        mt={4}
                        ml={4}
                        colorScheme="teal"
                        value={request}
                        onClick={(e) => {
                          approve(e.target.value);
                        }}
                      >
                        Approve
                      </Button>
                    </div>
                  );
                })}
              </List>
            ) : (
              <div></div>
            )}
          </Box>
        </div>
      );
    } else {
      return (
        <div>
          <Box w="10%" mx="45%" mt="5%">
            <Button mt={4} colorScheme="teal">
              Register
            </Button>
          </Box>
        </div>
      );
    }
  }

  useEffect(() => {
    getRegisteredStatus();
    getRequests();
  }, []);

  return (
    <div>
      <Navbar />
      {renderContent()}
    </div>
  );
}
