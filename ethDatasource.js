const { RESTDataSource } = require("apollo-datasource-rest");

//Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

//Etherscan Data Source Class
class EtherDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
  }

  async etherBalanceByAddress() {
    // Get account balance for the eth_address
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }
  //Get total supply of Ether
  async totalSupplyOfEther() {
    // Get latest ETH price in USD
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  //Get the latest Ethereum price in USD
  async getLatestEthereumPrice() {
    // Get latest ETH price in USD
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }
// Get the estimated block confirmation time in seconds 
// for a gas price of 2 Gwei
  async getBlockConfirmationTime() {
      // Get estimated block confirmation time for 2 Gwei gas price
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }  
}

module.exports = EtherDataSource;
