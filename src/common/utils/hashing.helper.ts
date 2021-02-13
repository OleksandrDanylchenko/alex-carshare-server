import { compare, hash } from 'bcrypt';

export const hashValue = async (value: string): Promise<string> =>
  hash(value, 10);

export const compareValues = async (
  data: string,
  encrypted: string
): Promise<boolean> => compare(data, encrypted);
