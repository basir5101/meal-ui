import { getCsrfToken } from "next-auth/react";
import { getSession } from "next-auth/react";

import React, { Component } from "react";
import CommonLayout from "../../components/layout/CommonLayout";

export default function SignIn({ csrfToken, error }) {
  return (
    <CommonLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name="email"
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Login
                </button>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CommonLayout>
  );
}

export async function getServerSideProps(context) {
  let hasError = false;
  if (context.query && context.query.error) {
    hasError = true;
  }
  const session = await getSession(context);
  if (session?.jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      error: hasError,
    },
  };
}
