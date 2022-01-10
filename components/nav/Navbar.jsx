import React, { Component, useState } from "react";
import Link from "next/link";
import { Book, Edit, User, UserMinus, UserPlus } from "react-feather";
import { signOut, useSession } from "next-auth/react";
import { Transition } from "@headlessui/react";
import Image from "next/image";

function Nav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link href="/">
                  <a className="pt-6 font-semibold text-3xl">
                    <Image
                      src="/images/web_logos.png"
                      height={150}
                      width={150}
                      alt="my-meal"
                    />
                  </a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/meals/start-month">
                    <a className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                      <span className="flex">
                        <Edit color="white" />{" "}
                        <span className="ml-2">Start Calculate Meal</span>
                      </span>
                    </a>
                  </Link>

                  {!session ? (
                    <>
                      <Link href="/auth/login">
                        <a className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                          <span className="flex">
                            {" "}
                            <User /> <span className="ml-2">Login</span>
                          </span>
                        </a>
                      </Link>

                      <Link href="/auth/signup">
                        <a className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                          <span className="flex">
                            {" "}
                            <UserPlus /> <span className="ml-2">Sign up</span>
                          </span>
                        </a>
                      </Link>
                    </>
                  ) : (
                    <>
                      <button className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                        <span onClick={() => signOut()} className="flex">
                          <UserMinus /> <span className="ml-2">Logout</span>
                        </span>
                      </button>
                      <Link href="/user/me">
                        <a className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                          <span className="flex">
                            <UserMinus />
                            <span className="ml-2"> {session.user.name} </span>
                          </span>
                        </a>
                      </Link>
                    </>
                  )}
                  <Link href="https://docs.google.com/presentation/d/1oJ8V4E3okHcEsTiwyGH8JAKXY_ID2vx5iqidHaaxM8M/edit?usp=sharing">
                    <a className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                      <span className="flex">
                        <Book color="white" />
                        <span className="ml-2">Read How To Use</span>
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-indigo-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/meals/start-month">
                  <a className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                    <span className="flex">
                      <Edit color="white" />{" "}
                      <span className="ml-2">Start Calculate Meal</span>
                    </span>
                  </a>
                </Link>

                {!session ? (
                  <>
                    <Link href="/auth/login">
                      <a className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                        <span className="flex">
                          {" "}
                          <User /> <span className="ml-2">Login</span>
                        </span>
                      </a>
                    </Link>

                    <Link href="/auth/signup">
                      <a className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                        <span className="flex">
                          {" "}
                          <UserPlus /> <span className="ml-2">Sign up</span>
                        </span>
                      </a>
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                      <span onClick={() => signOut()} className="flex">
                        <UserMinus /> <span className="ml-2">Logout</span>
                      </span>
                    </span>
                    <Link href="/user/me">
                      <a className="hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                        <span className="flex">
                          <UserMinus />
                          <span className="ml-2"> {session.user.name} </span>
                        </span>
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;