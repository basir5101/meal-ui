import { Component } from "react";
import React, { useState } from "react";
import { Minus, Plus } from "react-feather";
import moment from "moment";
import ApiClient from "../../../components/api/ApiClient";
import withRouter from "next/dist/client/with-router";
import CommonLayout from "../../../components/layout/CommonLayout";
import Loading from "../../../components/helper/Loading";
moment().format();

class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: props.meal.names || [
        {
          name: "",
        },
      ],
      submitted: false,
      warning: {
        delete: false,
        index: null,
      },
    };
  }

  handleShoppingInputs = (event, shopIndex) => {
    let { name, value } = event.target;
    this.state.names[shopIndex][name] = value;
    this.setState({
      names: this.state.names,
    });
  };

  handleAddNewShopping = () => {
    const array = this.state.names;
    array.push({
      name: "",
      values: [
        {
          date: moment(new Date()).format("YYYY-MM-DD"),
          meal: 0,
        },
      ],
      deposits: [
        {
          date: moment(new Date()).format("YYYY-MM-DD"),
          amount: 0,
        },
      ],
    });
    this.setState({
      names: this.state.names,
    });
  };

  removeShopping = (shopIndex) => {
    this.setState({
      names: this.state.names.filter((value, index) => index !== shopIndex),
      warning: {
        delete: false,
        id: null,
      },
    });
  };

  handleSubmit = async () => {
    this.setState({
      submitted: true,
    });
    const data = await ApiClient.updateNames(
      this.state.names,
      this.props.meal.id
    );
    if (data.id) {
      this.props.router.push(`/meals/update-meal/${data.id}`);
    }
  };

  removingConformation = (index) => {
    this.setState({
      warning: {
        delete: true,
        index: index,
      },
    });
  };

  render() {
    return (
      <CommonLayout className="md:container md:mx-auto mt-5">
        <div className="md:w-1/2 mx-auto  w-full">
          <div className="bg-white w-full shadow rounded p-2 my-6 sm:p-12">
            <p className="text-3xl font-bold text-indigo-600 leading-7 text-center">
              {this.props.meal.title}
              <span className="text-blue-600">- Update User</span>
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="items-center transition mt-8 group border border-indigo-100">
                <div className="duration-500 transition">
                  <div className="w-full mt-4 text-center flex">
                    <label className="ml-3 font-semibold text-indigo-700 leading-none">
                      Names
                    </label>
                  </div>

                  {this.state.names.map((name, nameIndex) => (
                    <div
                      key={nameIndex}
                      className="w-full flex md:ml-6 md:mt-0 transition relative"
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="inter name"
                        defaultValue={name.name}
                        onChange={(e) =>
                          this.handleShoppingInputs(e, nameIndex)
                        }
                        className="w-full mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                      />

                      {this.state.warning.delete &&
                        nameIndex === this.state.warning.index && (
                          <p className="text-pink-800 pl-3 absolute w-full mr-2 leading-none  focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200">
                            Want to delete ?{" "}
                            <button
                              onClick={() => this.removeShopping(nameIndex)}
                              className="px-10 text-white rounded-md mx-3 py-4 bg-pink-900"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => {
                                this.setState({
                                  warning: { delete: false, index: null },
                                });
                              }}
                              className="px-10 text-white rounded-md mx-3 py-4 bg-indigo-600 "
                            >
                              No
                            </button>
                          </p>
                        )}
                      <button
                        onClick={() => this.removingConformation(nameIndex)}
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
      </CommonLayout>
    );
  }
}

export default withRouter(Name);

export async function getServerSideProps(context) {
  const id = context.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`);
  const data = await res.json();
  return {
    props: {
      meal: data,
    },
  };
}
