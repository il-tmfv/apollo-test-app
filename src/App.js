import React, { Component } from 'react';
import Show from './Show';
import ShowList from './ShowList';
import Update from './Update';
import AddListItem from './AddItemList';
import RemoveItemList from './RemoveItemList';
import EditItemList from './EditItemList';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import GraphQlClient from './GraphQlClient';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={GraphQlClient.getClient()}>
        <div className="App">
          <Show />
          <Update by={1}/>
          <Update by={10}/>
          <br />
          <ShowList />
          <AddListItem />
          <EditItemList />
          <RemoveItemList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
