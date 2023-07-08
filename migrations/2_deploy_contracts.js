// Migrations/2_deploy_contracts.js
const TipContract = artifacts.require("TipContract");

module.exports = function (deployer) {
  deployer.deploy(TipContract);
};
