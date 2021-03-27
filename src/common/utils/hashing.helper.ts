import { compare, hash } from 'bcrypt';

export const createHash = async (value: string): Promise<string> =>
  hash(value, 10);

export const compareHash = async (
  checkString: string,
  encryptedString: string
): Promise<boolean> => compare(checkString, encryptedString);
