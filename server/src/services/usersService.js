import * as usersRepository from "../repositories/usersRepository.js";
import { ConflictError, NotFoundError } from "../utils/errors.js";

export const processCreateUser = async (username, email, password) => {
  const isDuplicate = await usersRepository.checkDuplicateUser(username, email);

  if (isDuplicate) {
    throw new ConflictError(null, 'User with this username or email already exists.');
  }

  const result = await usersRepository.createUser(username, email, password);
  return result;
}

export const processGetAllUsers = async () => {
  const users = await usersRepository.getAllUsers();
  return users;
}

export const processGetUserById = async (id) => {
  const user = await usersRepository.getUserById(id);

  if (!user) {
    throw new NotFoundError(null, 'User does not exist.');
  }

  return user;
}

export const processUpdateUserById = async (id, username, email, password) => {
  const updatedUser = await usersRepository.updateUserById(id, username, email, password);
  return updatedUser;
}