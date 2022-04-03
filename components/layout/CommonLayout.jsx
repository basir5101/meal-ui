import React from "react";
import Footer from "../Footer";
import Nav from "../nav/Navbar";

export default function CommonLayout(props) {
  return (
    <>
      <Nav />
      <main role="main">
        {props.preContainer && props.preContainer}
        {props.children}
      </main>
      {/* <Footer /> */}
    </>
  );
}
