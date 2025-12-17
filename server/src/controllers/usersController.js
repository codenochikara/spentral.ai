import { processCreateUser, processGetAllUsers, processGetUserById, processUpdateUserById } from "../services/usersService.js";
import responseDTO from "../utils/responseDTO.js";

export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await processCreateUser(username, email, password);
    responseDTO(res, 201, 'User created successfully.', newUser);
  } catch (error) {
    next(error);
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await processGetAllUsers();
    responseDTO(res, 200, 'Users fetched successfully.', users);
  } catch (error) {
    next(error);
  }
}

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await processGetUserById(id);
    responseDTO(res, 200, 'User fetched successfully.', user);
  } catch (error) {
    next(error);
  }
}

export const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const updatedUser = await processUpdateUserById(id, username, email, password);
    responseDTO(res, 200, 'User updated successfully.', updatedUser);
  } catch (error) {
    next(error);
  }
}
