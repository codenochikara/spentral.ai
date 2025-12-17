// General error handling middleware for unhandled errors
import responseDTO from "../utils/responseDTO.js";

const errorHandler = (err, req, res, next) => {
  console.log(`${err.name}: ${err.message}`);
  console.error(err.stack)
  responseDTO(res, err.statusCode || 500, err.message, { error: err.error || err.name });
}

export default errorHandler;
