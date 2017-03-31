import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`mutation AddItem { editSecondItem {
        id
        uuid
        value
    } 
}`;

class EditItemList extends Component {
  static propTypes = {
    by: PropTypes.number,
  };

  render() {
    const { mutate } = this.props;

    return (
      <div>
        <button onClick={() => { mutate() }}>Edit</button>
      </div>
    );
  }
}

export default graphql(mutation)(EditItemList);
