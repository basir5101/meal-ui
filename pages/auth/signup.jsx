import { Component } from "react";
import React, { useState } from "react";
import { Minus, Plus } from "react-feather";
import moment from "moment";
import withRouter from "next/dist/client/with-router";
import ApiClient from "../../components/api/ApiClient";
import CommonLayout from "../../components/layout/CommonLayout";
moment().format();

class Singup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",

      registered: false,
      error: props.error,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }

  submitForm = async (event) => {
    event.preventDefault();
    try {
      await ApiClient.registerUser({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      });
    } catch (error) {
      this.setState({ error: true });
      return;
    }

    this.setState({ registered: true });
  };

  handleInputs = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <CommonLayout className="md:container md:mx-auto mt-5">
        <div className="w-full">
          <div className="bg-gradient-to-b from-blue-900 to-blue-600 h-96"></div>
          <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
              {this.state.registered && "Registered"}
              <p className="text-3xl font-bold text-indigo-600 leading-7 text-center">
                Sign Up
              </p>
              <form>
                <div className="items-center transition mt-8">
                  <div className="duration-500 transition">
                    <div className="md:ml-6 md:mt-0">
                      <label
                        className="text-indigo-600 text-xl font-semibold"
                        htmlFor="email"
                      >
                        Username:{" "}
                      </label>
                      <input
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={(e) => this.handleInputs(e)}
                        className="w-full mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mb-5  border rounded border-gray-200"
                      />
                      <label
                        className="text-indigo-600 text-xl font-semibold"
                        htmlFor="email"
                      >
                        Email:{" "}
                      </label>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => this.handleInputs(e)}
                        className="w-full mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mb-5  border rounded border-gray-200"
                      />
                      <label
                        className="text-indigo-600 text-xl font-semibold"
                        htmlFor="password"
                      >
                        Password:
                      </label>
                      <input
                        type="text"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => this.handleInputs(e)}
                        className="w-full mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 border rounded border-gray-200"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={this.submitForm}
                    className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
                  >
                    Sign Up
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

export default withRouter(Singup);
