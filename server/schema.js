const schema = `
type Query {
  count: Int!
  list: [Item]
}

type Mutation {
  updateCount(by: Int!): Int!
  addItem: Item!
  editSecondItem: Item!
}

type Item {
  id: ID!
  uuid: String!
  value: Int!
}`;

module.exports = schema;
