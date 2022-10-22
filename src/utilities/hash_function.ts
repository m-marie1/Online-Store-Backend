import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id: Number;
  first_name: string;
  last_name: string;
  password: string;
};

export const getHashedPassword = function (password: string) {
  const hash = bcrypt.hashSync(
    password + BCRYPT_PASSWORD,
    parseInt(SALT_ROUNDS as string)
  );
  return hash;
};
