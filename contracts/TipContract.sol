// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract TipContract {
    event TipReceived(address indexed from, address indexed to, uint256 value, string message);

    address payable public streamer;

    constructor(address payable _streamer) {
        streamer = _streamer;
    }

    function sendTip(string memory message) public payable {
        streamer.transfer(msg.value);
        emit TipReceived(msg.sender, streamer, msg.value, message);
    }
}
