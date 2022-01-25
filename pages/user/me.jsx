import React, { Component } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import { getSession } from "next-auth/react";
import ApiClient from "../../components/api/ApiClient";
import Link from "next/link";
import { Edit } from "react-feather";

export default class Me extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CommonLayout>
        <div className="lg:w-1/2 mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-600 my-6">
            My Meals
          </h1>
          {this.props.meals.length > 0 ? (
            this.props.meals.map((meal) => (
              <div key={meal.id} className="my-6">
                <div className="mx-12 ">
                  <Link href={`/meals/${meal.slug}`}>
                    <a className="font-semibold bg-purple-50 px-6 shadow-md hover:text-white transition  py-6 block hover:bg-indigo-600 uppercase text-xl text-indigo-800">
                      <h2>
                        <span className="pr-6"> 👍 </span> {meal.title}
                      </h2>
                    </a>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center my-6">
              <h2 className="text-pink-800 text-4xl">You didn't start yet!</h2>
              <div className="flex justify-center items-center my-6">
                <Link href="/meals/start-month">
                  <a className="inline-block text-sm px-4 pt-4 pb-2 bg-indigo-700 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-indigo-400 mt-4 lg:mt-0">
                    <span className="flex">
                      <Edit color="white" />
                      <span className="ml-2">Start Calculate Meal</span>
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </CommonLayout>
    );
  }
}

export async function getServerSideProps(context) {
  let meals = [];
  const session = await getSession(context);
  if (session) {
    meals = await ApiClient.getMealByUserId(session.id);
  }
  return {
    props: {
      meals: meals,
    },
  };
}
