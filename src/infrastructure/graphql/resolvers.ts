import { createTaskController } from "../task/dependencies.js"
import { createUserController, loginUserController } from "../user/dependencies.js"


export const resolvers = {
  Query: {
    getUser: () => ({})
  },

  Mutation: {
    createUser: createUserController.run.bind(createUserController),
    loginUser: loginUserController.run.bind(loginUserController),
    createTask: createTaskController.run.bind(createTaskController)
  }
}