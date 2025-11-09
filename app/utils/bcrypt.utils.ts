import bcrypt from "bcryptjs";

export const createHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const isValidPassword = async (plainPassword: string, hashedPassword: string) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};