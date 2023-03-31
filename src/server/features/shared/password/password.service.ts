import argon2 from 'argon2';

interface PasswordServiceInterface {
  hash(password: string): Promise<string>;
  compare(hashedPassword: string, password: string): Promise<boolean>;
}

export const passwordService: PasswordServiceInterface = {
  hash(password) {
    return argon2.hash(password);
  },
  compare(hashedPassword, password) {
    return argon2.verify(hashedPassword, password);
  },
};
