const CryptoPosts = artifacts.require('CryptoPosts')

module.exports = function (deployer) {
  deployer.deploy(CryptoPosts)
}
