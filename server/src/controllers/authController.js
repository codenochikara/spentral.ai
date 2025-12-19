import { processHandleLogin, processHandleLogout, processRefreshJwt } from "../services/authService.js";
import responseDTO from "../utils/responseDTO.js";

export const handleLogin = async (req, res, next) => {
  const { identifier, password } = req.body;
  try {
    const result = await processHandleLogin(identifier, password);

    const { username, accessToken, refreshToken } = result;

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'Lax',
      // secure: true,
      maxAge: 5 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'Lax',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    const responseData = {
      username
    };

    responseDTO(res, 200, `User ${username} is logged in.`, responseData);
  } catch (error) {
    next(error);
  }
}

export const refreshJwt = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    const { username, accessToken } = await processRefreshJwt(refreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'Lax',
      // secure: true,
      maxAge: 5 * 60 * 1000
    });

    responseDTO(res, 200, `Access token re-generated for user ${username}.`);
  } catch (err) {
    next(err);
  }
}

export const handleLogout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    // Always clear cookie (idempotent)
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'Lax',
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
