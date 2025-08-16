export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/user",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
