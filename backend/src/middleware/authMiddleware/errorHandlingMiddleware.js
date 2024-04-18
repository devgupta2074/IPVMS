export const exceptionHandler = (error, req, res, next) => {
  const statusCode = error.statusCode;
  const message = error.message;
  console.log(error);
  //   console.log("the status code is", statusCode, error);
  //logger
  return res.status(statusCode).send({ statusCode, message });
};
