import React, { Component } from "react";
import Link from "next/link";
import { Edit } from "react-feather";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="bg-indigo-900 text-white py-3">
        <Link href="/">
          <a className="px-12 font-semibold text-3xl">My Meal</a>
        </Link>

        <Link href="/meals/start-month">
          <a className="mx-5 py-2 px-2 text-gray-50 rounded-t-md inline-block hover:bg-indigo-800 transition font-semibold bg-indigo-600">
            <span className="flex">
              <Edit color="indigo" /> Start Calculate Meal
            </span>
          </a>
        </Link>
      </nav>
    );
  }
}
