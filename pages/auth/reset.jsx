import { getCsrfToken } from "next-auth/react";
import { getSession } from "next-auth/react";
import apiClient from "../../components/api/ApiClient";
import React, { Component } from "react";
import CommonLayout from "../../components/layout/CommonLayout";

export default class Reset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      error: props.error,
      done: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }

  submitForm = async (event) => {
    event.preventDefault();

    try {
      await apiClient.resetPassword(this.state);
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
    return (
      <CommonLayout>
        <div>
          {this.state.done && <p>"Check your email for details."</p>}

          <form onSubmit={this.submitForm}>
            <input
              name="csrfToken"
              type="hidden"
              defaultValue={this.props.csrfToken}
            />

            <input
              className="bg-indigo-400 m-20 px-3 py-5 w-full"
              name="email"
              value={this.state.email}
              onChange={this.handleInputs}
            />

            <button className="px-10 bg-indigo-400 mx-12">Reset</button>
          </form>
        </div>
      </CommonLayout>
    );
  }
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
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
      error: hasError,
    },
  };
}
