import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "../graphql/typeDefs.js";
import { resolvers } from "../graphql/resolvers.js";
import type { User } from "../../domain/user/User.js";
import { buildContext } from "../graphql/context.js";


export class Server {
  private server: ApolloServer<{ currentUser: User | null }>;

  constructor() {
    this.server = new ApolloServer<{ currentUser: User | null }>({
      typeDefs,
      resolvers,
    });
  }

  async start() {
    const { url } = await startStandaloneServer(this.server, {
      context: async ({ req }) => buildContext({ req })
    });
    console.log(`🚀  Server ready at: ${url}`);
  }

}