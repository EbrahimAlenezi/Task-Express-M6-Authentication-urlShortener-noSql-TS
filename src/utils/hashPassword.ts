import bcrypt from "bcrypt";

export const hashPasswod = async (originalPassword: string) => {
  const saltRound = 10;
  const hashedPasswod = await bcrypt.hash(originalPassword, saltRound);
  return hashedPasswod;
};
