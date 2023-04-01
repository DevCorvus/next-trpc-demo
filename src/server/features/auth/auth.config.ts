import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { loginSchema } from '@/common/schemas/auth.schema';

import { passwordService } from '../shared/password/password.service';
import { usersService } from '../users/users.service';

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
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id as number,
          email: token.email as string,
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
