// Import the necessary modules
const TipContract = artifacts.require("./TipContract.sol");

contract("TipContract", (accounts) => {
  let tipContract;

  // Setup accounts
  const streamer = accounts[0];
  const tipper = accounts[1];

  // Setup initial message and tip amount
  const message = "Great stream!";
  const tipAmount = web3.utils.toWei("1", "ether"); // Convert 1 ETH to Wei

  beforeEach(async () => {
    // Deploy the contract and get the instance
    tipContract = await TipContract.new(streamer);
  });

  it("should send and track a tip", async () => {
    // arrange
    const beforeTipperBalance = await web3.eth.getBalance(tipper);
    const beforeStreamerBalance = await web3.eth.getBalance(streamer);

    // act
    const receipt = await tipContract.sendTip(streamer, message, {
      from: tipper,
      value: tipAmount,
    });

    // assert
    const afterTipperBalance = await web3.eth.getBalance(tipper);
    const afterStreamerBalance = await web3.eth.getBalance(streamer);
    const gasUsed = receipt.receipt.gasUsed;
    const gasPrice = await web3.eth.getGasPrice();

    assert.equal(receipt.logs.length, 1, "should have received one event");
    assert.equal(
      receipt.logs[0].event,
      "TipReceived",
      "event name should be TipReceived"
    );
    assert.equal(
      receipt.logs[0].args.from,
      tipper,
      "tipper should be the sender"
    );
    assert.equal(
      receipt.logs[0].args.to,
      streamer,
      "streamer should be the recipient"
    );
    assert.equal(
      receipt.logs[0].args.value.toString(),
      tipAmount,
      "tip amount should match"
    );
    assert.equal(receipt.logs[0].args.message, message, "message should match");
    assert.equal(
      parseInt(afterTipperBalance),
      parseInt(beforeTipperBalance) -
        (parseInt(tipAmount) + gasUsed * parseInt(gasPrice)),
      "tipper balance should be reduced by tip amount and gas used"
    );
    assert.equal(
      parseInt(afterStreamerBalance),
      parseInt(beforeStreamerBalance) + parseInt(tipAmount),
      "streamer balance should be increased by tip amount"
    );
  });
});
