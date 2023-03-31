import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { passwordService } from '../shared/password/password.service';
import { usersService } from '../users/users.service';
import { loginSchema } from './auth.schema';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials, req) => {
        const parsedCredentials = await loginSchema.parseAsync(credentials);

        const user = await usersService.findOneByEmail(parsedCredentials.email);

        if (!user) return null;

        const doPasswordsMatch = await passwordService.compare(
          user.password,
          parsedCredentials.password
        );

        if (!doPasswordsMatch) return null;

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id as number,
        };
      }
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 30, // 30 mins
  },
  secret: 'super-secret',
  pages: {
    newUser: '/sign-up',
    signIn: '/sign-in',
  },
};
