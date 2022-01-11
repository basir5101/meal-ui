import React, { useState } from "react";
import Link from "next/link";
import CommonLayout from "../../components/layout/CommonLayout";
import MealRate from "../../components/summary/MealRate";
import {
  Database,
  FilePlus,
  ShoppingBag,
  ShoppingCart,
  User,
} from "react-feather";
import { getSession } from "next-auth/react";
import Router from "next/router";
import ApiClient from "../../components/api/ApiClient";

export default function meal(props) {
  console.log(props);
  const handleAddFavorite = async () => {
    const session = await getSession();
    if (session) {
      await ApiClient.updateUser(Router.asPath, session.id);
      Router.push("/user/favorites");
    } else {
      Router.push("/auth/login?error=Please Login First");
    }
  };

  return (
    <CommonLayout>
      <div className="md:container mb-48 mx-4 md:mx-auto mt-5">
        <div>
          <h1 className="text-4xl text-indigo-700 font-bold my-10 text-center">
            {props.meal.title.toUpperCase()}
          </h1>
          <div>
            <Link href={`/meals/update-user/${props.meal.id}`}>
              <a className="text-indigo-600 border shadow-lg border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 px-5 md:px-10 justify-center text-center items-center">
                  <User />
                  <span className="font-semibold ml-2 text-2xl">Users</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-meal/${props.meal.id}`}>
              <a className="text-indigo-600 shadow-lg border border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 px-2 md:px-10 justify-center text-center items-center">
                  <Database />
                  <span className="font-semibold ml-2 text-2xl">Meals</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-shopping/${props.meal.id}`}>
              <a className="text-indigo-600 border shadow-lg border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 md:px-10 justify-center text-center items-center">
                  <ShoppingCart />
                  <span className="font-semibold ml-2 text-2xl">Shoppings</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-deposit/${props.meal.id}`}>
              <a className="shadow-lg text-indigo-600 border  border-indigo-600 ml-4 px-3 py-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 md:px-10 justify-center text-center items-center">
                  <FilePlus />
                  <span className="font-semibold ml-2 text-2xl">Deposits</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-extra-cost/${props.meal.id}`}>
              <a className="text-indigo-600 shadow-lg border border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 md:px-10 justify-center text-center items-center">
                  <ShoppingBag />
                  <span className="font-semibold ml-2 text-2xl">
                    Extra Cost
                  </span>
                </span>
              </a>
            </Link>
          </div>
        </div>
        <MealRate meal={props.meal} />
        <div className="flex items-center justify-center w-full">
          <button
            onClick={() => handleAddFavorite()}
            className="mt-9  font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
          >
            Add To Favorites
          </button>
        </div>
      </div>
    </CommonLayout>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meals?slug=${slug}`
  );
  const data = await res.json();

  return {
    props: {
      meal: data[0],
    }, // will be passed to the page component as props
  };
}
