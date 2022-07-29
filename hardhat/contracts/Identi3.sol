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
    constructor() {}
    function register(string memory _name, string memory _email) public {
        require(digitalIdentities[_name] == address(0), "already taken");
        digitalIdentities[_name] =msg.sender;
        didIds.increment();
        Register registeredForDID = new Register(_name, _email, msg.sender);
        allRegisteredAddresses.push(registeredForDID);
    }
    function getRegisteredContracts() public view returns(Register[] memory) {
        return allRegisteredAddresses;
    }
}

contract Register is Ownable {
    string public name;
    string public email;
    bool private primaryEducation;
    bool private secondaryEducation;
    bool private higherEducation;
    bool private ugEducation;
    bool private pgEducation;
    bool private phdEducation;
    string[] private cid;
    uint256[] private seq;
    constructor(string memory _name, string memory _email, address _owner) {
        name = _name;
        email = _email;
        _transferOwnership(_owner);
    }
    function issueCred(string memory _cid, uint256 _num) public {
        require(owner() != msg.sender, "cannot issue");
        cid.push(_cid);
        seq.push(_num);
    }
}