const Precompiled = artifacts.require("Precompiled");

module.exports = function (deployer) {
  deployer.deploy(Precompiled);
};
