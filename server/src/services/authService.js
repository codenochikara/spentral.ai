import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersRepository from '../repositories/usersRepository.js';
import { NotFoundError, UnauthorizedError, ValidationError } from '../utils/errors.js';

export const processHandleLogin = async (identifier, password) => {
  const user = await usersRepository.getUserByIdentifier(identifier);
  if (!user) {
    throw new NotFoundError(null, 'User does not exist.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new UnauthorizedError(null, 'User is unauthorized.')
  }

  const accessToken = jwt.sign(
    {
      userInfo: {
        username: user.username,
        email: user.email,
        userId: user.user_id
      }
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: '5m' }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  await usersRepository.updateRefreshToken(user.username, refreshToken);

  return {
    username: user.username,
    accessToken,
    refreshToken
  }
}

export const processRefreshJwt = async (refreshToken) => {
  if (!refreshToken) {
    throw new UnauthorizedError(null, 'Refresh token missing');
  }

  const user = await usersRepository.getUserByRefreshToken(refreshToken);
  if (!user) {
    throw new UnauthorizedError(null, 'Invalid refresh token');
  }

  let decoded;
  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
  } catch (err) {
    throw new ValidationError(null, 'Refresh token expired or invalid');
  }

  if (decoded.username !== user.username) {
    throw new ValidationError(null, 'Token user mismatch');
  }

  const accessToken = jwt.sign(
    {
      userInfo: {
        username: user.username,
        email: user.email,
        userId: user.user_id
      }
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: '5m' }
  );

  return {
    username: user.username,
    accessToken
  };
}

export const processHandleLogout = async (refreshToken) => {
  if (!refreshToken) return;

  const user = await usersRepository.getUserByRefreshToken(refreshToken);

  // Token not found → already logged out (silent success)
  if (!user) return;

  await usersRepository.clearRefreshToken(user.id);

  return {
    username: user.username
  }
}
