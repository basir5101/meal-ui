import React, { Component } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import { getSession } from "next-auth/react";

export default class Me extends Component {
  render() {
    return <CommonLayout></CommonLayout>;
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session.id);
  return {
    props: {
      meal: "data",
    },
  };
}
