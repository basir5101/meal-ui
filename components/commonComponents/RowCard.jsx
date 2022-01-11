import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit } from "react-feather";

export default class RowCard extends Component {
  render() {
    return (
      <div className="md:flex justify-center min-h-screen items-center bg-gray-50 p-10">
        <div>
          <Image src="/images/331.jpg" alt="my meal" height={400} width={500} />
        </div>
        <div className="mx-10">
          <h2 className="text-2xl font-semibold text-indigo-700">
            Easiest way to calculate meal
          </h2>
          <p className="my-4 text-indigo-900">
            Your information will be store for lifetime.
            <br /> You can modify your data anytime.
          </p>
          <Link href="/meals/start-month">
            <a className="inline-block text-sm px-4 m-10 pt-4 pb-2 leading-none border rounded bg-indigo-600 hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 lg:mt-0">
              <span className="flex">
                <Edit color="white" />
                <span className="font-semibold ml-3 text-gray-50">
                  Start Calculate Meal
                </span>
              </span>
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
