import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";

export default function callback(props) {
  const router = useRouter();
  const handleSubmit = () => {};
  useEffect(() => {
    if (props.access_token) {
      handleSubmit();
    }
  }, [props]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
        <input
          style={{ display: "none" }}
          type="text"
          name="email"
          defaultValue=""
        />
        <input
          style={{ display: "none" }}
          type="password"
          name="password"
          defaultValue=""
        />
        <input
          style={{ display: "none" }}
          type="access_token"
          name="access_token"
          defaultValue={props.access_token}
        />
        <button
          className="mb-4 bg-indigo-800 px-20 py-3 text-white font-bold text-xl w-100 ml-0 mt-2"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Confirm Login
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const access_token = context.query.access_token || context.query.code || null;
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/user/me",
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      access_token,
      session,
    },
  };
}
