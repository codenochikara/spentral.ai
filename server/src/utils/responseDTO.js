const responseDTO = (res, status, message = '', data = []) => {
  res.status(status).json({
    status,
    message,
    data
  });
};

export default responseDTO;
