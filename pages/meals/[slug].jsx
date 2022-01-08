import React, { useState } from "react";
import Link from "next/link";
import CommonLayout from "../../components/layout/CommonLayout";
import MealRate from "../../components/summary/MealRate";
import { User } from "react-feather";

export default function meal(props) {
  return (
    <CommonLayout>
      <div className="md:container mx-4 md:mx-auto mt-5">
        <div>
          <h1 className="text-4xl text-indigo-700 font-bold my-10 text-center">
            {props.meal.title.toUpperCase()}
          </h1>
          <div>
            <Link href={`/meals/update-user/${props.meal.id}`}>
              <a className="text-indigo-600 border shadow-lg border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex py-6 px-10 justify-center text-center items-center">
                  <User />
                  <span className="font-semibold ml-2 text-2xl">Users</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-meal/${props.meal.id}`}>
              <a className="text-indigo-600 shadow-lg border border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex py-6 px-10 justify-center text-center items-center">
                  <User />
                  <span className="font-semibold ml-2 text-2xl">Meals</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-shopping/${props.meal.id}`}>
              <a className="text-indigo-600 border shadow-lg border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex py-6 px-10 justify-center text-center items-center">
                  <User />
                  <span className="font-semibold ml-2 text-2xl">Shoppings</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-deposit/${props.meal.id}`}>
              <a className="shadow-lg text-indigo-600 border  border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex py-6 px-10 justify-center text-center items-center">
                  <User />
                  <span className="font-semibold ml-2 text-2xl">Deposits</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-extra-cost/${props.meal.id}`}>
              <a className="text-indigo-600 shadow-lg border border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex py-6 px-10 justify-center text-center items-center">
                  <User />
                  <span className="font-semibold ml-2 text-2xl">
                    Extra Cost
                  </span>
                </span>
              </a>
            </Link>
          </div>
        </div>
        <MealRate meal={props.meal} />
        {/* {props.meal.names.map((name, nameIndex) => (
          <div className="ml-3 my-4" key={name.id}>
            <h4 className="text-2xl text-indigo-700 font-bold">
              {nameIndex + 1}. {name.name}{" "}
            </h4>
            <table className="table-auto container text-center">
              <thead>
                <tr className="bg-blue-400">
                  <th>Date</th>
                  <th>Meal</th>
                </tr>
              </thead>
              <tbody>
                {name.values.map((value) => (
                  <tr
                    key={value.id}
                    className="bg-blue-200 border-t-2 border-gray-400"
                  >
                    <td className="border-r-2 py-2 border-gray-400">
                      {value.date}
                    </td>
                    <td>{value.meal}</td>
                  </tr>
                ))}
                <tr className="bg-blue-300">
                  <td className="border-r-2 border-gray-400">Total Meal: </td>
                  <td>
                    {name.values[nameIndex] &&
                      name.values[nameIndex].meal &&
                      name.values.reduce(
                        (acc, val) => (acc = acc + val.meal),
                        0
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))} */}
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
