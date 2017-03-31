import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`query TestQuery {
    list {
        id
        uuid
        value
    }
}`;

const mutation = gql`mutation RemoveItem { removeItem }`;

class RemoveItemList extends Component {
  static propTypes = {
    by: PropTypes.number,
  };

  render() {
    const { mutate } = this.props;

    return (
      <div>
        <button onClick={() => { mutate() }}>Remove</button>
      </div>
    );
  }
}

export default graphql(mutation,
  {
    options: {
      update: (proxy, { data: { removeItem } }) => {
        let data = proxy.readQuery({ query });
        data.list = data.list.filter(x => x.id !== removeItem);
        proxy.writeQuery({ query, data });
      },
    },
  }
)(RemoveItemList);
