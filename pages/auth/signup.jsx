import { Component } from "react";
import React, { useState } from "react";
import moment from "moment";
import withRouter from "next/dist/client/with-router";
import ApiClient from "../../components/api/ApiClient";
import CommonLayout from "../../components/layout/CommonLayout";
import Link from "next/link";
import Loading from "../../components/helper/Loading";
import ErrorCard from "../../components/helper/ErrorCard";
import { getCookieParser } from "next/dist/server/api-utils";
import cookie from "js-cookie";
moment().format();

class Singup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",

      registered: false,
      submitted: false,
      error: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }

  submitForm = async (event) => {
    this.setState({
      submitted: true,
    });
    event.preventDefault();

    const data = await ApiClient.registerUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    });
    console.log(data);
    if (!data.jwt) {
      console.log("hi");
      this.setState({
        submitted: false,
        error: true,
      });
    } else {
      this.props.router.push("/auth/login?message=Registration Success");
    }
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
                {this.state.error && (
                  <ErrorCard
                    title="Registration Failed"
                    description="please try again later"
                  />
                )}
                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={this.submitForm}
                    disabled={this.state.submitted}
                    className="mt-9 disabled:bg-gray-500 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
                  >
                    Sign Up
                  </button>

                  {this.state.submitted && <Loading />}
                  <Link href="/auth/login">
                    <a className="text-sm mt-9 font-semibold leading-none  py-4 px-10  hover:underline">
                      Log in
                    </a>
                  </Link>
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
