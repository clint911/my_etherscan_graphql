// Import Apollo Server and schema import utility
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import custom EtherDataSource 
const EtherDataSource = require("./datasource/ethDatasource");
// Import GraphQL schema
const typeDefs = importSchema("./schema.graphql");
// Load environment variables
require("dotenv").config();
// Define GraphQL resolvers
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
    
  // Pass EtherDataSource in dataSources
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0 (no timeout)
server.timeout = 0;
// Start Apollo Server
server.listen("9001").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
