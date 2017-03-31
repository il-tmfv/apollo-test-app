import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`query TestQuery { count }`
const mutation = gql`mutation UpdateCount($by: Int!) { updateCount(by: $by) }`;

class Update extends Component {
  static propTypes = {
    by: PropTypes.number,
  };

  render() {
    const { mutate, by } = this.props;

    return (
      <div>
        <button onClick={() => {
          mutate({ variables: { by } })
        }}>+
        </button>
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
