import { processHandleLogin, processHandleLogout, processRefreshJwt } from "../services/authService.js";
import responseDTO from "../utils/responseDTO.js";

export const handleLogin = async (req, res, next) => {
  const { identifier, password } = req.body;
  try {
    const result = await processHandleLogin(identifier, password);

    const { username, accessToken, refreshToken } = result;

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    const responseData = {
      accessToken
    };

    responseDTO(res, 200, `User ${username} is logged in.`, responseData);
  } catch (error) {
    next(error);
  }
}

export const refreshJwt = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.jwt;

    const result = await processRefreshJwt(refreshToken);

    const responseData = {
      accessToken: result.accessToken
    }

    responseDTO(res, 200, `Access token re-generated for user ${result.username}.`, responseData);
  } catch (err) {
    next(err);
  }
}

export const handleLogout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.jwt;

    // Always clear cookie (idempotent)
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      // secure: true
    });

    // No refresh token → no content
    if (!refreshToken) {
      return res.sendStatus(204);
    }

    const result = await processHandleLogout(refreshToken);

    responseDTO(res, 200, `User ${result.username} logged out successfully.`);
  } catch (err) {
    next(err);
  }
};
