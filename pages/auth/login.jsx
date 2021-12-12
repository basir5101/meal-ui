import { getCsrfToken } from "next-auth/react";
import { getSession } from "next-auth/react";

import React, { Component } from "react";
import CommonLayout from "../../components/layout/CommonLayout";

export default function SignIn({ csrfToken, error }) {
  return (
    <CommonLayout>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <input type="text" name="email" placeholder="email" />
        <br />
        <input type="password" name="password" placeholder="password" />

        <button>Signin</button>
      </form>
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
