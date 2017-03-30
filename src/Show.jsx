import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`query TestQuery { count }`

class Show extends Component {
  static propTypes = {
    value: PropTypes.string,
  }

  render() {
    const { data: { count } } = this.props;

    return (
      <div>{count}</div>
    );
  }
}

export default graphql(query)(Show);
