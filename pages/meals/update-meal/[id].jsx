import { Component } from "react";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Edit,
  Minus,
  Plus,
} from "react-feather";
import Moment from "react-moment";
import moment from "moment";
import ApiClient from "../../../components/api/ApiClient";
import withRouter from "next/dist/client/with-router";
import { getSession } from "next-auth/react";
import CommonLayout from "../../../components/layout/CommonLayout";
moment().format();

class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_details: props.meal.names || [
        {
          name: "",
          values: [
            {
              date: null,
              meal: 0,
            },
          ],
        },
      ],
    };
    this.removeMeal = this.removeMeal.bind();
    this.handleAddNewMeal = this.handleAddNewMeal.bind();
  }

  handleMealInputs = (event, nameIndex, mealIndex) => {
    let { name, value } = event.target;
    if (mealIndex !== undefined) {
      this.state.meal_details[nameIndex].values[mealIndex][name] = value;
      this.setState({
        product_details: this.state.product_details,
      });
    }
  };

  handleAddNewMeal = (nameIndex) => {
    const array = this.state.meal_details[nameIndex].values;
    array.push({
      date: moment(new Date()).format("YYYY-MM-DD"),
      meal: 0,
    });
    this.setState({
      meal_details: this.state.meal_details,
    });
  };

  removeMeal = (nameIndex, mealIndex) => {
    this.state.meal_details[nameIndex].values.splice(mealIndex, 1);
    this.setState({
      meal_details: this.state.meal_details,
    });
  };

  handleSubmit = async () => {
    const data = await ApiClient.updateMeals(
      this.state.meal_details,
      this.props.meal.id
    );
    if (data.id) {
      this.props.router.push(`/meals/${data.slug}`);
    }
  };

  render() {
    return (
      <CommonLayout>
        <div className="md:container md:mx-auto mt-5">
          <div className="w-full">
            <div className="bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
              <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
                <p className="text-3xl font-bold text-indigo-600 leading-7 text-center">
                  {this.props.meal.title}{" "}
                  <span className="text-blue-600">- Update Meal</span>
                </p>
                <form onSubmit={(e) => e.preventDefault()}>
                  {this.state.meal_details.map((name, nameIndex) => (
                    <div
                      key={nameIndex}
                      className="m-8 rounded overflow-hidden"
                    >
                      <div className="group outline-none" tabIndex="1">
                        <div className="group bg-indigo-50 flex justify-between px-4 py-3 items-center text-indigo-900 font-semibold text-xl transition ease duration-500 cursor-pointer pr-10 relative">
                          <div className="group-focus:text-blue-800 transition ease duration-500">
                            {nameIndex + 1}. {name.name}
                          </div>
                        </div>
                        <div className="bg-indigo-50 px-4 overflow-hidden ease duration-500">
                          <div className="duration-500 transition">
                            <div className="w-full mt-4 text-center flex">
                              <label className="w-1/2 font-semibold text-indigo-700 leading-none">
                                Date
                              </label>
                              <label className="w-1/2 text-indigo-700 font-semibold leading-none">
                                Meal
                              </label>
                            </div>

                            {name.values.map((value, mealIndex) => (
                              <div
                                key={mealIndex}
                                className="w-full flex md:ml-6 md:mt-0 transition"
                              >
                                <input
                                  type="date"
                                  defaultValue={value.date}
                                  name="date"
                                  onChange={(e) =>
                                    this.handleMealInputs(
                                      e,
                                      nameIndex,
                                      mealIndex
                                    )
                                  }
                                  className="w-1/2 mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                                <input
                                  type="number"
                                  name="meal"
                                  defaultValue={value.meal}
                                  onChange={(e) =>
                                    this.handleMealInputs(
                                      e,
                                      nameIndex,
                                      mealIndex
                                    )
                                  }
                                  className="w-1/2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                                <button
                                  onClick={() =>
                                    this.removeMeal(nameIndex, mealIndex)
                                  }
                                  className="text-red-600  my-5 pr-6"
                                >
                                  <Minus />
                                </button>
                              </div>
                            ))}
                            <div className="w-full text-right">
                              <button
                                onClick={(e) =>
                                  this.handleAddNewMeal(nameIndex)
                                }
                                className="bg-gradient-to-b from-blue-800 m-1 p-2 to-blue-600 text-white"
                              >
                                <Plus />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center w-full">
                    <button
                      onClick={this.handleSubmit}
                      className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    );
  }
}

export default withRouter(Meal);

export async function getServerSideProps(context) {
  const id = context.query.id;
  const data = await ApiClient.getMealById(id);
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      meal: data,
    },
  };
}
