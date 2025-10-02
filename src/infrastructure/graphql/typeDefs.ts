export const typeDefs = `
  type User {
    id: ID!
    email: String!
    password: String
    token: String
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
    userId: ID!
  }

  type UserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type TaskResponse {
    code: Int!
    success: Boolean!
    message: String!
    task: Task
  }

  type Query {
    getUser(id: ID!): UserResponse
  }

  type Mutation {
    createUser(email: String!, password: String!): UserResponse
    loginUser(email: String!, password: String!): UserResponse
    createTask(title: String!, description: String!): TaskResponse
  }
`