import React, { Component } from "react";
import Link from "next/link";
import { Edit, User, UserMinus, UserPlus } from "react-feather";
import { signOut, useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();
  return (
    <footer>
      <nav className="bg-gray-600 mt-96 h-52 text-white py-3">
        <Link href="/">
          <a className="px-12 font-semibold text-3xl">My Meal</a>
        </Link>

        <Link href="/meals/start-month">
          <a className="mx-5 py-2 px-2 text-gray-50 rounded-t-md inline-block hover:bg-indigo-800 transition font-semibold bg-indigo-600">
            <span className="flex">
              <Edit color="indigo" />{" "}
              <span className="ml-2">Start Calculate Meal</span>
            </span>
          </a>
        </Link>

        {!session ? (
          <span>
            <Link href="/auth/login">
              <a className="mx-5 py-2 px-2 text-gray-50 rounded-t-md inline-block hover:bg-indigo-800 transition font-semibold bg-indigo-600">
                <span className="flex">
                  {" "}
                  <User /> <span className="ml-2">Login</span>
                </span>
              </a>
            </Link>

            <Link href="/auth/signup">
              <a className="mx-5 py-2 px-2 text-gray-50 rounded-t-md inline-block hover:bg-indigo-800 transition font-semibold bg-indigo-600">
                <span className="flex">
                  {" "}
                  <UserPlus /> <span className="ml-2">Sign up</span>
                </span>
              </a>
            </Link>
          </span>
        ) : (
          <span>
            <Link href="/meals/start-month">
              <a className="mx-5 py-2 px-2 text-gray-50 rounded-t-md inline-block hover:bg-indigo-800 transition font-semibold bg-indigo-600">
                <span onClick={() => signOut()} className="flex">
                  <UserMinus /> <span className="ml-2">Logout</span>
                </span>
              </a>
            </Link>
            <Link href="/users/me">
              <a className="mx-5 py-2 px-2 text-gray-50 rounded-t-md inline-block hover:bg-indigo-800 transition font-semibold bg-indigo-600">
                <span onClick={() => signOut()} className="flex">
                  <UserMinus />
                  <span className="ml-2"> {session.user.name} </span>
                </span>
              </a>
            </Link>
          </span>
        )}
      </nav>
    </footer>
  );
}
