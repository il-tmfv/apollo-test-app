import React, { Component } from 'react';
import Show from './Show';
import Update from './Update';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import GraphQlClient from './GraphQlClient';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={GraphQlClient.getClient()}>
        <div className="App">
          <Show />
          <Update />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
