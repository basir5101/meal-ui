import React, { Component } from "react";
import CommonLayout from "../../../components/layout/CommonLayout";

export default class index extends Component {
  render() {
    return <CommonLayout></CommonLayout>;
  }
}

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
