import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

const WEB_BFF_HOST = process.env.WEB_BFF_HOST;

let tokenStore;

const networkInterface = createNetworkInterface({
  uri: WEB_BFF_HOST || 'http://localhost:3333/graphql',
  opts: {
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    if (tokenStore) {
      req.options.headers.Authorization = `bearer ${tokenStore}`;
    }

    next();
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

class GraphQlClient {
  gql = gql;

  constructor() {
    this._client = client;

    this.useAuthToken = token => {
      tokenStore = token;
    };
  }

  mutate(mutation, variables) {
    return this._client.mutate({
      mutation,
      variables,
    });
  }

  query(query, variables) {
    return this._client.query({
      query,
      variables,
    });
  }

  getClient() {
    return this._client;
  }
}

export default new GraphQlClient();
