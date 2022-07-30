// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Identi3 is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public didIds;
    mapping(string => address) public digitalIdentities;
    Register[] public allRegisteredAddresses;
    mapping (address => Register) public profileToContract;
    mapping (address => bool) public registered;
    constructor() {}
    function register(string memory _name) public {
        require(digitalIdentities[_name] == address(0), "already taken");
        digitalIdentities[_name] =msg.sender;
        didIds.increment();
        Register registeredForDID = new Register(_name, msg.sender);
        allRegisteredAddresses.push(registeredForDID);
        profileToContract[msg.sender] = registeredForDID;
        registered[msg.sender] = true;
    }
    function getRegisteredContracts() public view returns(Register[] memory) {
        return allRegisteredAddresses;
    }
}

contract Register is Ownable {
    string public name;
    bool private emailVerified;
    bool private phoneVerified;
    bool private aadhaarVerified;
    bool private panVerified;
    mapping(address => bool) private thirdParties;
    address[] public accessRequests;
    using Counters for Counters.Counter;
    Counters.Counter public requests;
    struct Profile {
        string email;
        string phone;
        string aadhaar;
        string pan;
    }
    Profile private myProfile;
    constructor(string memory _name, address _owner) {
        name = _name;
        _transferOwnership(_owner);
        thirdParties[_owner] = true;
    }
    function verifyEmail(string memory _email) public {
        require(owner() == msg.sender, "not the owner");
        require(emailVerified == false, "already verified");
        myProfile.email = _email;
        emailVerified = true;
    }
    function verifyPhone(string memory _phone) public {
        require(owner() == msg.sender, "not the owner");
        require(phoneVerified == false, "already verified");
        myProfile.phone = _phone;
        phoneVerified = true;
    }
    function verifyAadhaar(string memory _aadhaar) public {
        require(owner() == msg.sender, "not the owner");
        require(aadhaarVerified == false, "already verified");
        myProfile.aadhaar = _aadhaar;
        aadhaarVerified = true;
    }
    function verifyPan(string memory _pan) public {
        require(owner() == msg.sender, "not the owner");
        require(panVerified == false, "already verified");
        myProfile.pan = _pan;
        panVerified = true;
    }
    function allowStatus(address _address) public view returns(bool) {
        return thirdParties[_address];
    }
    function checkEmailStatus(address _address) public view returns(bool) {
        require(thirdParties[_address] == true, "not allowed");
        return emailVerified;
    }
    function checkPhoneStatus(address _address) public view returns(bool) {
        require(thirdParties[_address] == true, "not allowed");
        return phoneVerified;
    }
    function checkAadhaarStatus(address _address) public view returns(bool) {
        require(thirdParties[_address] == true, "not allowed");
        return aadhaarVerified;
    }
    function checkPanStatus(address _address) public view returns(bool) {
        require(thirdParties[_address] == true, "not allowed");
        return panVerified;
    }
    function getEmail(address _address) public view returns(string memory) {
        require(thirdParties[_address] == true, "not allowed");
        return myProfile.email;
    }
    function getPhone(address _address) public view returns(string memory) {
        require(thirdParties[_address] == true, "not allowed");
        return myProfile.phone;
    }
    function getAadhaar(address _address) public view returns(string memory) {
        require(thirdParties[_address] == true, "not allowed");
        return myProfile.aadhaar;
    }
    function getPan(address _address) public view returns(string memory) {
        require(thirdParties[_address] == true, "not allowed");
        return myProfile.pan;
    }
    function addParty(address _address) public onlyOwner {
        thirdParties[_address] = true;
    }
    function removeParty(address _address) public onlyOwner {
        thirdParties[_address] = false;
    }
    function requestAccess(address _address) public {
        accessRequests.push(_address);
        requests.increment();
    }
}