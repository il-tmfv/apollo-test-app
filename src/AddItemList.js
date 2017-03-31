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

const mutation = gql`mutation AddItem { addItem {
        id
        uuid
        value
    } 
}`;

class AddItemList extends Component {
  static propTypes = {
    by: PropTypes.number,
  };

  render() {
    const { mutate } = this.props;

    return (
      <div>
        <button onClick={() => { mutate() }}>Add</button>
      </div>
    );
  }
}

export default graphql(mutation,
  {
    options: {
      update: (proxy, { data: { addItem } }) => {
        let data = proxy.readQuery({ query });
        console.log(data);
        data.list = data.list.concat([addItem]);
        proxy.writeQuery({ query, data });
      },
    },
  }
)(AddItemList);
