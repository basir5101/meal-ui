import { Component } from "react";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Edit, Minus, Plus } from "react-feather";
import Moment from "react-moment";
import moment from "moment";
import ApiClient from "../../../components/api/ApiClient";
import withRouter from "next/dist/client/with-router";
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
    console.log(data);
    if (data.id) {
      this.props.router.push("/meals/october");
    }
  };

  render() {
    return (
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
                    className="items-center transition mt-8 group border border-indigo-100"
                  >
                    <div className="flex px-5 hover:transition bg-indigo-100 py-2 justify-between">
                      <p className="text-2xl font-bold text-blue-600 leading-7">
                        {nameIndex + 1}. {name.name}
                      </p>
                      <p className="hover:rotate-180 transition">
                        <ArrowUp />
                      </p>
                    </div>
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
                              this.handleMealInputs(e, nameIndex, mealIndex)
                            }
                            className="w-1/2 mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                          />
                          <input
                            type="number"
                            name="meal"
                            defaultValue={value.meal}
                            onChange={(e) =>
                              this.handleMealInputs(e, nameIndex, mealIndex)
                            }
                            className="w-1/2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                          />
                          <button
                            onClick={() =>
                              this.removeMeal(nameIndex, mealIndex)
                            }
                            className="text-red-600  my-5"
                          >
                            <Minus />
                          </button>
                        </div>
                      ))}
                      <div className="w-full text-right">
                        <button
                          onClick={(e) => this.handleAddNewMeal(nameIndex)}
                          className="bg-gradient-to-b from-blue-800 m-1 p-2 to-blue-600 text-white"
                        >
                          <Plus />
                        </button>
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
    );
  }
}

export default withRouter(Meal);

export async function getServerSideProps(context) {
  const id = context.query.id;
  const res = await fetch(`http://localhost:1337/meals/${id}`);
  const data = await res.json();
  return {
    props: {
      meal: data,
    },
  };
}
