export const logger = (req, res, next) => {
  console.log(`Method:${req.method} \nURL:${req.url}`);
  next();
};
