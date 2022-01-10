import React, { Component } from "react";
import Link from "next/link";
import { Edit, Facebook, GitHub, Linkedin, MessageSquare } from "react-feather";

export default function Footer() {
  return (
    <footer>
      <div className="bg-indigo-900 lg:fixed w-full bottom-0 lg:mt-48 text-gray-200 sm:flex justify-center">
        <div className="text-2xl my-5 font-semibold">
          <p>Contact: </p>
        </div>
        <div className="text-right p-4 col-sm-6 flex">
          <Link href="https://github.com/basir5101">
            <a className="sm:mx-10 px-5 py-3 bg-indigo-500 rounded-full">
              <GitHub />
            </a>
          </Link>
          <Link href="https://facebook.com/basir5101">
            <a className="mx-5 px-5 py-3 bg-indigo-500 rounded-full">
              <Facebook />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/abdul-basir-b087971b1/">
            <a className="sm:mx-10 px-5 py-3 bg-indigo-500 rounded-full">
              <Linkedin />
            </a>
          </Link>
          <Link href="mailto:basir.bsmrstu@gmail.com">
            <a className="sm:mx-10 ml-5 px-5 py-3 bg-indigo-500 rounded-full">
              <MessageSquare />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
