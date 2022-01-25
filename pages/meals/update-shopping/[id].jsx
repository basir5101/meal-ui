import { Component } from "react";
import React, { useState } from "react";
import { Minus, Plus } from "react-feather";
import moment from "moment";
import ApiClient from "../../../components/api/ApiClient";
import withRouter from "next/dist/client/with-router";
import CommonLayout from "../../../components/layout/CommonLayout";
moment().format();

class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppings: props.meal.shoppings || [
        {
          date: null,
          description: " ",
          cost: 0,
        },
      ],
    };
    this.removeShopping = this.removeShopping.bind();
    this.handleAddNewShopping = this.handleAddNewShopping.bind();
  }

  handleShoppingInputs = (event, shopIndex) => {
    let { name, value } = event.target;
    this.state.shoppings[shopIndex][name] = value;
    this.setState({
      shoppings: this.state.shoppings,
    });
  };

  handleAddNewShopping = () => {
    const array = this.state.shoppings;
    array.push({
      date: moment(new Date()).format("YYYY-MM-DD"),
      description: "",
      cost: 0,
    });
    this.setState({
      meal_details: this.state.shoppings,
    });
  };

  removeShopping = (shopIndex) => {
    this.state.shoppings.splice(shopIndex, 1);
    this.setState({
      shoppings: this.state.shoppings,
    });
  };

  handleSubmit = async () => {
    const data = await ApiClient.updateShoppings(
      this.state.shoppings,
      this.props.meal.id
    );
    if (data.id) {
      this.props.router.push(`/meals/${data.slug}`);
    }
  };

  render() {
    return (
      <CommonLayout className="md:container md:mx-auto mt-5">
        <div className="w-full">
          <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white w-full shadow rounded p-2 sm:p-12">
              <p className="text-3xl font-bold text-indigo-600 leading-7 text-center">
                {this.props.meal.title}
                <span className="text-blue-600">- Update Shopping</span>
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="items-center transition mt-8 group border border-indigo-100">
                  <div className="duration-500 transition">
                    <div className="w-full mt-4 text-center flex">
                      <label className="w-1/2 font-semibold text-indigo-700 leading-none">
                        Date
                      </label>
                      <label className="w-1/2 font-semibold text-indigo-700 leading-none">
                        Description
                      </label>
                      <label className="w-1/2 text-indigo-700 font-semibold leading-none">
                        Cost
                      </label>
                    </div>

                    {this.state.shoppings.map((shopping, shopIndex) => (
                      <div
                        key={shopIndex}
                        className="w-full flex md:ml-6 md:mt-0 transition"
                      >
                        <input
                          type="date"
                          name="date"
                          defaultValue={shopping.date}
                          onChange={(e) =>
                            this.handleShoppingInputs(e, shopIndex)
                          }
                          className="w-1/2 mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                        />
                        <input
                          type="description"
                          name="text"
                          placeholder="fish = 200, vegetables = 100"
                          onChange={(e) =>
                            this.handleShoppingInputs(e, shopIndex)
                          }
                          defaultValue={shopping.description}
                          className="w-1/2 mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                        />
                        <input
                          type="number"
                          name="cost"
                          onChange={(e) =>
                            this.handleShoppingInputs(e, shopIndex)
                          }
                          defaultValue={shopping.cost}
                          className="w-1/2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                        />
                        <button
                          onClick={() => this.removeShopping(shopIndex)}
                          className="text-red-600  my-5"
                        >
                          <Minus />
                        </button>
                      </div>
                    ))}
                    <div className="w-full text-right">
                      <button
                        onClick={this.handleAddNewShopping}
                        className="bg-gradient-to-b from-blue-800 m-1 p-2 to-blue-600 text-white"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                </div>
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
      </CommonLayout>
    );
  }
}

export default withRouter(Shopping);

export async function getStaticProps(context) {
  const id = context.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`);
  const data = await res.json();
  return {
    props: {
      meal: data,
    },
  };
}
