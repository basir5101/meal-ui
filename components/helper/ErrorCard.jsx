import React, { Component } from "react";
import { Loader } from "react-feather";

export default class ErrorCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.classN || "text-center text-pink-800 "}>
        <p className="mt-5 text-2xl font-semibold mx-5">
          {this.props.title || "Error"}
        </p>
        <p> {this.props.description || ""} </p>
      </div>
    );
  }
}
