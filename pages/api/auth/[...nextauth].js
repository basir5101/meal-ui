import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import ApiClient from "../../../components/api/ApiClient";

const options = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
        access_token: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (credentials.access_token) {
            const data = await ApiClient.googleLogin(credentials.access_token);
            if (data.user.confirmed) {
              return data;
            } else {
              throw new Error(` Google Login Problem `);
            }
          } else {
            const { data } = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
              {
                identifier: credentials.email,
                password: credentials.password,
              }
            );
            if (data.user.confirmed) {
              return data;
            } else {
              throw new Error(` user and password not matched `);
            }
          }
        } catch (e) {
          // const user = await ApiClient.getUserByEmail(credentials.email);
          // if (user.length > 0) {
          //   throw new Error(`wrong password`);
          // } else if (user.length === 0) {
          //   throw new Error(`This email is not registered`);
          // } else {
          //   throw new Error(`Something went wrong`);
          // }
          throw new Error(`Something went wrong`);
          //return null;
          // const errorMessage = e.response.data.message
          // Redirecting to the login page with error message          in the URL
          //throw new Error(errorMessage + '&email=' + credentials.email)
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.user.id;
        token.name = user.user.username;
        token.email = user.user.email;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.jwt = token.jwt;
      session.id = token.id;
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
