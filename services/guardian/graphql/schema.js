const { gql } = require('@guardapp/server');

module.exports = gql`
	input PaginateInput {
		limit: Int!
		offset: Int!
	}

	enum Role {
		ADMIN
		PRINCIPAL
		TEACHER
		PARENT
	}

	interface User {
		id: ID!
		email: String!
	}

	input AddUserInput {
		email: String!
		roles: [Role!]!
	}

	type EmailExists {
		message: String!
	}
	union AddUserResult = EmailExists | Admin | Parent | Teacher | Principal

	type UserPaginate {
		data: [User!]
		total: Int!
		hasMore: Boolean!
	}

	type Admin implements User {
		id: ID!
		email: String!
	}

	type Parent implements User {
		id: ID!
		email: String!
		children: [Child]!
	}

	type Teacher implements User {
		id: ID!
		email: String!
		classes: [String]
	}

	type Principal implements User {
		id: ID!
		email: String!
		kindergarten: [String]
	}

	type Child {
		id: ID!
		name: String!
		profile: String!
		age: Float!
		parent: Parent!
		class: Class
	}

	type Class {
		id: ID!
		name: String!
		capacity: Int!
		children: [Child!]
		teacher: Teacher!
		kindergarten: Kindergarten!
	}

	type ClassPaginate {
		data: [Class!]
		total: Int!
		hasMore: Boolean!
	}

	type Kindergarten {
		id: ID!
		name: String!
		city: String
		address: String
		country: String
		classes: [Class!]
		principal: Principal!
	}

	type KindergartenPaginate {
		data: [Kindergarten!]
		total: Int!
		hasMore: Boolean!
	}

	type Query {
		# users
		me: User!
		users(role: Role, paginate: PaginateInput = { limit: 10, offset: 1 }): [User] #UserPaginate
		user(id: ID!): User

		# child
		child(id: ID!): Child

		# class
		classes(paginate: PaginateInput = { limit: 10, offset: 1 }): ClassPaginate
		class(id: ID): Class

		# kindergartens
		kindergartens(paginate: PaginateInput = { limit: 10, offset: 1 }): KindergartenPaginate
		kindergarten(id: ID!): Kindergarten
	}

	type Mutation {
		# users
		addUser(user: AddUserInput): AddUserResult
		deleteUser(id: ID!): Boolean
	}
`;
