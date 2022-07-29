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
    mapping(address => bool) public registered;
    mapping(string => Holder) private holders;
    struct Holder {
        string email;
        string name;
        string cid;
        address holderAddress;
        address issuerAddress;
    }
    constructor() {}
    function register(string memory _name) public {
        require(registered[msg.sender] == false, 'already registered');
        digitalIdentities[_name] =msg.sender;
        registered[msg.sender] = true;
        didIds.increment();
    }
    function issueCred(string memory _email, string memory _name, string memory _cid) public {
        require(registered[digitalIdentities[_name]] == true);
        holders[_name] = Holder(_email, _name, _cid, digitalIdentities[_name], msg.sender);
    }
    function getHolder(string memory _name) public view returns(Holder memory) {
        require(digitalIdentities[_name] == msg.sender, "not registered");
        require(holders[_name].holderAddress == msg.sender);
        return holders[_name];
    }
}