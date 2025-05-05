import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const secret = process.env.JWT_Token;
  console.log("JWT_SECRET from env:", process.env.JWT_TOKEN);

  if (!secret) {
    throw new Error("JWT_TOKEN is not defined in environment variables.");
  }

  const token = jwt.sign({ userId }, secret, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Protects against XSS
    secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
    sameSite: "strict", // Helps protect against CSRF
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });
};

export default createTokenAndSaveCookie;
