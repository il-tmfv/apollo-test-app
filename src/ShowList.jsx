import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`query TestQuery {
    list {
        id
        uuid
        value
    }
}`

class Show extends Component {
  static propTypes = {
    value: PropTypes.string,
  }

  render() {
    const { data: { list } } = this.props;

    return (
      <div>
        {!!list && list.map((x, key) => (
          <div key={key}>
            <div>{`id ${x.id}`}</div>
            <div>{`uuid ${x.uuid}`}</div>
            <div>{`value ${x.value}`}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default graphql(query)(Show);
