import { getCsrfToken } from "next-auth/react";
import { getSession } from "next-auth/react";
import apiClient from "../../components/api/ApiClient";
import React, { Component } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import Link from "next/link";
import ErrorCard from "../../components/helper/ErrorCard";
import Loading from "../../components/helper/Loading";
import { withRouter } from "next/router";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirm_password: "",
      code: props.code,
      error: props.error,
      done: false,
      submitted: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }

  submitForm = async (event) => {
    event.preventDefault();
    this.setState({
      submitted: true,
    });
    try {
      const confirm = await apiClient.resetPassword2(this.state);
      if (confirm.jwt) {
        this.props.router.push("/auth/signin?message=Reset Password Success");
      }
    } catch (error) {
      this.setState({ error: true });
      return;
    }

    this.setState({ done: true });
  };

  handleInputs = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    if (!this.state.code) {
      return (
        <CommonLayout>
          <ErrorCard
            title="Code is invalid"
            description="Reset token expired"
          />
        </CommonLayout>
      );
    }
    return (
      <CommonLayout>
        <div className="w-full">
          <div className="bg-gradient-to-b from-blue-900 to-blue-600 h-96"></div>
          <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
              {this.state.registered && "Registered"}
              <p className="text-3xl font-bold text-indigo-600 leading-7 text-center">
                Reset Password
              </p>
              {this.state.done && (
                <ErrorCard
                  classN="text-white transition bg-indigo-500 pb-2 text-center"
                  title="Email Sent"
                  description="Please Check your email"
                />
              )}
              <form>
                <div className="items-center transition mt-8">
                  <div className="duration-500 transition">
                    <div className="md:ml-6 md:mt-0">
                      <label
                        className="text-indigo-600 text-xl font-semibold"
                        htmlFor="email"
                      >
                        New Password:{" "}
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        onChange={(e) => this.handleInputs(e)}
                        className="w-full mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700  border rounded border-gray-200"
                      />
                    </div>
                    <div className="md:ml-6 md:mt-0">
                      <label
                        className="text-indigo-600 text-xl font-semibold"
                        htmlFor="email"
                      >
                        Confirm New Password:
                      </label>
                      <input
                        type="password"
                        name="confirm_password"
                        placeholder="Enter confirm password"
                        onChange={(e) => this.handleInputs(e)}
                        className="w-full mr-2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700  border rounded border-gray-200"
                      />
                    </div>
                  </div>
                </div>
                {this.state.error && (
                  <ErrorCard
                    title="Reset Failed"
                    description="please try again later"
                  />
                )}
                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={this.submitForm}
                    disabled={this.state.submitted}
                    className="mt-9 disabled:bg-gray-500 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
                  >
                    Submit
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

export default withRouter(ResetPassword);

// This is the recommended way for Next.js 9.3 or newer
export async function getStaticProps(context) {
  let hasError = false;
  if (context.query && context.query.error) {
    hasError = true;
  }
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/users/me",
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      code: context.query.code,
      error: hasError,
    },
  };
}
