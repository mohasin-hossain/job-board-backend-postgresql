import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './app/graphql/graphql.schema';
import { resolvers } from './app/graphql/graphql.resolvers';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  // Create Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  // Start Apollo Server
  await apolloServer.start();

  // Apply middleware to Express
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // Start Express server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
    console.log(
      `GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`,
    );
  });
};

startServer();
