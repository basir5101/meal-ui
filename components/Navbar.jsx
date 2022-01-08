import React, { Component } from "react";
import Link from "next/link";
import { Edit, User, UserMinus, UserPlus } from "react-feather";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div>
      {/* <nav className="bg-indigo-900 text-white py-3">
        <Link href="/">
          <a className="px-12 font-semibold text-3xl">My Meal</a>
        </Link>

        <Link href="/meals/start-month">
          <a className="inline-block text-sm px-4 pt-4 pb-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
            <span className="flex">
              <Edit color="indigo" />{" "}
              <span className="ml-2">Start Calculate Meal</span>
            </span>
          </a>
        </Link>

        {!session ? (
          <span>
            <Link href="/auth/login">
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
                <span className="flex">
                  {" "}
                  <User /> <span className="ml-2">Login</span>
                </span>
              </a>
            </Link>

            <Link href="/auth/signup">
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
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
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
                <span onClick={() => signOut()} className="flex">
                  <UserMinus /> <span className="ml-2">Logout</span>
                </span>
              </a>
            </Link>
            <Link href="/user/me">
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
                <span className="flex">
                  <UserMinus />
                  <span className="ml-2"> {session.user.name} </span>
                </span>
              </a>
            </Link>
          </span>
        )}
      </nav> */}
      <nav className="flex items-center bg-indigo-900 justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <a className="px-12 font-semibold text-3xl">My Meal</a>
          </Link>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link href="/meals/start-month">
              <a className="inline-block text-sm px-4 pt-4 pb-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
                <span className="flex">
                  <Edit color="white" />{" "}
                  <span className="ml-2">Start Calculate Meal</span>
                </span>
              </a>
            </Link>

            {!session ? (
              <span>
                <Link href="/auth/login">
                  <a className="inline-block mx-10 text-sm px-4 pt-4 pb-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
                    <span className="flex">
                      {" "}
                      <User /> <span className="ml-2">Login</span>
                    </span>
                  </a>
                </Link>

                <Link href="/auth/signup">
                  <a className="inline-block text-sm px-4 pt-4 pb-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
                    <span className="flex">
                      {" "}
                      <UserPlus /> <span className="ml-2">Sign up</span>
                    </span>
                  </a>
                </Link>
              </span>
            ) : (
              <span>
                <button className="inline-block text-sm px-4 mx-4 pt-4 pb-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
                  <span onClick={() => signOut()} className="flex">
                    <UserMinus /> <span className="ml-2">Logout</span>
                  </span>
                </button>
                <Link href="/user/me">
                  <a className="inline-block text-sm px-4 pt-4 pb-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
                    <span className="flex">
                      <UserMinus />
                      <span className="ml-2"> {session.user.name} </span>
                    </span>
                  </a>
                </Link>
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
