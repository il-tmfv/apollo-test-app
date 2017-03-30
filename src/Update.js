import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`query TestQuery { count }`
const mutation = gql`mutation { updateCount }`;

class Update extends Component {
  static propTypes = {}

  render() {
    const { mutate } = this.props;

    return (
      <div>
        <button onClick={()=>{ mutate() }}>+</button>
      </div>
    );
  }
}

export default graphql(mutation,
  {
    options: {
      update: (proxy, { data: { updateCount } }) => {
        let data = proxy.readQuery({ query });
        data.count = updateCount;
        proxy.writeQuery({ query, data });
      },
    },
  }
)(Update);
