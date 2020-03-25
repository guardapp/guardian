const {gql} = require('@guardapp/server');

module.exports = gql`
type User {
  id: ID!
  email: String!
  roles: [String]
}

type Query{
  me: User!
}
`;
