import { join } from 'path';

export const getEnvArray = (
  envArrayString: string,
  delimiter = ','
): string[] => envArrayString.split(delimiter) || [];

export const getRuntimePaths = (envPaths: string[]): string[] =>
  envPaths.map((path) => path.replace('src', 'dist').replace('.ts', '.js'));

export const getPath = (path: string): string => {
  return join(process.cwd(), path || '');
};

export const getPaths = (paths: string[]): string[] =>
  paths.map((p) => getPath(p));
