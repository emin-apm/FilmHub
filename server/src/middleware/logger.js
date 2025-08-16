export const logger = (req, res, next) => {
  console.log(`Method:${req.method} \nURL:${req.url}`);

  if (req.cookies?.authcookie) {
    console.log("✅ Refresh token cookie is attached");
  } else {
    console.log("❌ No refresh token cookie found");
  }
  next();
};
