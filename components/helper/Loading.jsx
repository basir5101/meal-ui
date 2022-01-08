import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-16 h-16 border-4 border-indigo-900 border-dotted rounded-full animate-spin"
        ></div>
      </div>
    );
  }
}
