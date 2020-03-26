const {gql} = require('@guardapp/server');

module.exports = gql`

input Paginate {
  limit: Int!
  offset: Int!
}

enum Role {
  ADMIN,
  PRINCIPAL,
  TEACHER,
  PARENT
}

interface User {
  id: ID!
  email: String!
  roles: [Role]
}

type Admin implements User {
  id: ID!
  email: String!
  roles: [Role]  
}

type Parent implements User {
  id: ID!
  email: String!
  roles: [Role]
  children: [Child]!
} 

type Teacher implements User {
  id: ID!
  email: String!
  roles: [Role]  
  classes: [String]
}

type Principal implements User {
  id: ID!
  email: String!
  roles: [Role] 
  kindergarten: [String]
}

type Child {
  id: ID!
  name: String!
  profile: String!
  age: Float!
}

type Query{
  me: User!
  users(role: Role, paginate: Paginate = {limit: 10, offset: 1}): [User]!
}`;
