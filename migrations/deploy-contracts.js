const TipContract = artifacts.require("TipContract");

module.exports = function(deployer) {
    deployer.deploy(TipContract);
};
