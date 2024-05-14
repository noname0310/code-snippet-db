import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { AuthChecker, buildSchema, ContainerType, PubSubEngine } from 'type-graphql';
import { getUserAccessToken, UserAccessToken } from '../auth/userToken';
import { GraphQLSchema } from 'graphql';
import UserResolver from './resolvers/UserResolver';
import EmailResolver from './resolvers/EmailResolver';
import { CodeSnippetResolver } from './resolvers/CodeSnippetResolver';
import { ApolloServer, ExpressContext } from 'apollo-server-express';

export interface ApolloContext {
    userToken?: UserAccessToken;
}

const authChecker: AuthChecker<ApolloContext> = async (
    { root, args, context, info },
    roles
) => {
    root;
    args;
    info;

    const { userToken } = context;

    const loggedIn = (
        userToken !== undefined
    );

    if(!loggedIn)
        return false;
    
    return roles.every(role => {
        role;
        return false;
    });
};

function httpContext({ req }: ExpressContext): ApolloContext {

    const token = req.headers.authorization || '';

    try {
        const userToken = getUserAccessToken(token);
        return { userToken };
    } catch(e) {
        return {};
    }
}

export async function getSchema(pubSub: PubSubEngine, container: ContainerType) {
    return await buildSchema({
        resolvers: [
            UserResolver,
            EmailResolver,
            CodeSnippetResolver
        ],
        authChecker,
        container,
        pubSub
    });
}

export async function getApolloServer(schema: GraphQLSchema, isDevelopment: boolean) {
    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            isDevelopment
                ? ApolloServerPluginLandingPageGraphQLPlayground()
                : ApolloServerPluginLandingPageDisabled()
        ],
        context: httpContext
    });

    return apolloServer;
}
