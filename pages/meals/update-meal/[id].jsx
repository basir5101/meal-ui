import { Component } from "react";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowDown, Minus, Plus } from "react-feather";
import Moment from "react-moment";
import moment from "moment";
import ApiClient from "../../../components/api/ApiClient";
import withRouter from "next/dist/client/with-router";
import { getSession } from "next-auth/react";
import CommonLayout from "../../../components/layout/CommonLayout";
import Loading from "../../../components/helper/Loading";
import { Disclosure, Transition } from "@headlessui/react";
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
      submitted: false,
      warning: {
        delete: false,
        nameIndex: null,
        mealIndex: null,
      },
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
    const newMeal = this.state.meal_details[nameIndex].values.filter(
      (value, index) => index !== mealIndex
    );
    let meals = [...this.state.meal_details];
    meals[nameIndex].values = newMeal;
    this.setState({
      meal_details: meals,
    });
  };

  handleSubmit = async () => {
    this.setState({
      submitted: true,
    });
    const data = await ApiClient.updateMeals(
      this.state.meal_details,
      this.props.meal.id
    );
    if (data.id) {
      this.props.router.push(`/meals/${data.slug}`);
    }
  };

  removingConformation = (name, meal) => {
    this.setState({
      warning: {
        delete: true,
        nameIndex: name,
        mealIndex: meal,
      },
    });
  };

  render() {
    return (
      <CommonLayout>
        <div className="md:container md:mx-auto mt-5">
          <div className="w-full">
            <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 mb-12">
              <div className="bg-white w-full shadow rounded sm:p-12">
                <p className="text-3xl uppercase font-bold text-indigo-600 leading-7 text-center">
                  {this.props.meal.title}
                  <span className="text-blue-600">- Update Meal</span>
                </p>
                <form onSubmit={(e) => e.preventDefault()}>
                  {this.state.meal_details.map((name, nameIndex) => (
                    <div
                      key={nameIndex}
                      className="sm:m-8 mt-6 mx-2 rounded overflow-hidden"
                    >
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="group w-full mt-2 bg-indigo-600 flex justify-between px-4 py-3 items-center text-indigo-900 font-semibold text-xl transition ease duration-500 cursor-pointer pr-10 relative">
                              <div className="text-white transition ease duration-500">
                                {nameIndex + 1}. {name.name}
                              </div>
                              <ArrowDown
                                className={`${
                                  open
                                    ? "transform transition-all rotate-180"
                                    : ""
                                }`}
                                color="white"
                              />
                            </Disclosure.Button>
                            <Transition
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Disclosure.Panel>
                                <div className="bg-indigo-50 relative px-4 overflow-hidden ease duration-500">
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
                                        {this.state.warning.delete &&
                                          nameIndex ===
                                            this.state.warning.nameIndex &&
                                          mealIndex ===
                                            this.state.warning.mealIndex && (
                                            <p className="text-pink-800 pl-3 absolute w-full mr-2 leading-none  focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200">
                                              Want to delete ?{" "}
                                              <button
                                                onClick={() =>
                                                  this.removeMeal(
                                                    nameIndex,
                                                    mealIndex
                                                  )
                                                }
                                                className="px-10 text-white rounded-md mx-3 py-4 bg-pink-900"
                                              >
                                                Yes
                                              </button>
                                              <button
                                                onClick={() => {
                                                  this.setState({
                                                    warning: {
                                                      delete: false,
                                                      mealIndex: null,
                                                      nameIndex: null,
                                                    },
                                                  });
                                                }}
                                                className="px-10 text-white rounded-md mx-3 py-4 bg-indigo-600 "
                                              >
                                                No
                                              </button>
                                            </p>
                                          )}
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
                                            this.removingConformation(
                                              nameIndex,
                                              mealIndex
                                            )
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
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  ))}
                  {this.state.submitted && <Loading />}
                  <div className="flex items-center justify-center w-full">
                    <button
                      onClick={this.handleSubmit}
                      disabled={this.state.submitted}
                      className="mt-9 disabled:bg-gray-500 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
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
