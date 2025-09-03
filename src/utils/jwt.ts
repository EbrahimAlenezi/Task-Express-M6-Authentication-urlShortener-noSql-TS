import config from "../config";
import jwt from "jsonwebtoken";
export const generateToken = (username: string, _id: string) => {
  const payload = { userId: _id, username: username };

  const token = jwt.sign(
    payload,
    config.JWT_SECRET as jwt.Secret,
    {
      expiresIn: config.JWT_EXP,
    } as jwt.SignOptions
  );
  return token;
};
