const NFT = artifacts.require("Panda");
const Market = artifacts.require("NFTMarket")

module.exports = function (deployer) {
    deployer.deploy(Market)
    deployer.deploy(NFT);
};