import { withRouter } from "next/router";
import React, { Component } from "react";
import ApiClient from "../../../components/api/ApiClient";
import CommonLayout from "../../../components/layout/CommonLayout";

class StartMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  handleMealInputs = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = await ApiClient.saveMonth(this.state.title);
    if (data) {
      this.props.router.push(`/meals/${data.slug}`);
    }
  };

  render() {
    return (
      <CommonLayout>
        <div>
          <h2 className="text-4xl text-center">Start Your months</h2>
          <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
            <form>
              <div className="duration-500 transition">
                <input
                  type="text"
                  name="title"
                  placeholder="inter month"
                  onChange={this.handleMealInputs}
                  className="w-1/2 leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4  border rounded border-gray-200"
                />
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
      </CommonLayout>
    );
  }
}

export default withRouter(StartMonth);

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`);
  const data = await res.json();

  return {
    props: {
      meal: data[0],
    }, // will be passed to the page component as props
  };
}