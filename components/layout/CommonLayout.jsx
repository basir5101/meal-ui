import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function CommonLayout(props) {
  return (
    <>
      <Navbar />
      <main role="main">
        {props.preContainer && props.preContainer}
        {props.children}
      </main>
      <Footer />
    </>
  );
}
