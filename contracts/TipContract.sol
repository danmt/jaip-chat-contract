// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract TipContract {
    event TipReceived(address indexed from, address indexed to, uint256 value, string message);

    function sendTip(address payable to, string memory message) public payable {
        to.transfer(msg.value);
        emit TipReceived(msg.sender, to, msg.value, message);
    }
}
