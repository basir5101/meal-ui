import { getSession } from "next-auth/react";
import { withRouter } from "next/router";
import React, { Component } from "react";
import ApiClient from "../../../components/api/ApiClient";
import CommonLayout from "../../../components/layout/CommonLayout";
import Loading from "../../../components/helper/Loading";
import ErrorCard from "../../../components/helper/ErrorCard";

class StartMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      error: false,
      submitted: false,
    };
  }

  handleMealInputs = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      submitted: true,
    });
    if (this.state.title.match(/[a-z]/i) !== null) {
      const data = await ApiClient.saveMonth(this.state.title);
      if (data) {
        this.props.router.push(`/meals/update-user/${data.id}`);
      }
    } else {
      this.setState({
        error: true,
        submitted: false,
      });
    }
  };

  render() {
    return (
      <CommonLayout>
        <div>
          <h2 className="text-4xl text-center mt-6">Start Your months</h2>
          {this.state.error && (
            <ErrorCard description="Please write title in english" />
          )}
          <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
            <form>
              <div className="duration-500 transition text-center">
                <input
                  type="text"
                  name="title"
                  placeholder="write month hear..."
                  onChange={this.handleMealInputs}
                  className="w-1/2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4  border rounded border-gray-200"
                />
              </div>
              {this.state.submitted && <Loading />}
              <div className="flex items-center justify-center w-full">
                <button
                  disabled={this.state.submitted}
                  onClick={this.handleSubmit}
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

export default withRouter(StartMonth);

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login?message=Login First",
      },
    };
  }
  return {
    props: {
      data: "",
    },
  };
}
