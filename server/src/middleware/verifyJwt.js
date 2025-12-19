import jwt from 'jsonwebtoken';
import { ForbiddenError, UnauthorizedError } from '../utils/errors.js';

const verifyJwt = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) throw new UnauthorizedError(null, 'Access token missing.');

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new ForbiddenError(err, 'Invalid or expired access token.')
    }

    // Decode the token and attach user information to the request object
    req.user = decoded.userInfo;
    next();
  });
}

export default verifyJwt;
