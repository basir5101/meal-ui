import { getCsrfToken } from "next-auth/react";
import { getSession } from "next-auth/react";
import Link from "next/link";

import React, { useState } from "react";
import ErrorCard from "../../components/helper/ErrorCard";
import CommonLayout from "../../components/layout/CommonLayout";

export default function SignIn({ csrfToken, message }) {
  const [showPass, setShowPass] = useState(false);
  return (
    <CommonLayout>
      <div className="md:flex items-center justify-center min-h-screen bg-gray-100">
        {message && (
          <ErrorCard
            classN="text-center font-bold text-3xl text-blue-800"
            title={message}
            description="Please Login"
          />
        )}
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
              <div className="mt-4 relative">
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-6 inset-y-9 font-semibold text-gray-500"
                >
                  {showPass ? "hide" : "show"}
                </div>
                <label className="block">Password</label>
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
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

                <div>
                  <Link href="/auth/signup">
                    <a className="text-sm font-semibold text-blue-600 hover:underline">
                      Create new account
                    </a>
                  </Link>
                  <br />
                  <Link href="/auth/reset">
                    <a className="text-sm text-pink-600 hover:underline">
                      Forgot Password ?
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CommonLayout>
  );
}

export async function getStaticProps(context) {
  const message = context.query.message || context.query.error || "";
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
      message,
    },
  };
}
