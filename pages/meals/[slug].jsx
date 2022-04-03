import React, { useState } from "react";
import Link from "next/link";
import CommonLayout from "../../components/layout/CommonLayout";
import MealRate from "../../components/summary/MealRate";
import {
  Database,
  FilePlus,
  ShoppingBag,
  ShoppingCart,
  User,
} from "react-feather";
import { getSession } from "next-auth/react";
import Router from "next/router";
import ApiClient from "../../components/api/ApiClient";
import { FacebookShareButton, FacebookIcon } from "next-share";
import { WhatsappShareButton, WhatsappIcon } from "next-share";
import {
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "next-share";
import { EmailShareButton, EmailIcon } from "next-share";

import { useRouter } from "next/router";

export default function meal(props) {
  const router = useRouter();
  console.log(`${process.env.NEXTAUTH_URL}${router.asPath}`);

  return (
    <CommonLayout>
      <div className="md:container mb-48 mx-4 md:mx-auto mt-5">
        <div>
          <h1 className="text-4xl text-indigo-700 font-bold my-10 text-center">
            {props.meal.title.toUpperCase()}
          </h1>
          <div>
            <Link href={`/meals/update-user/${props.meal.id}`}>
              <a className="text-indigo-600 border shadow-lg border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 px-5 md:px-10 justify-center text-center items-center">
                  <User />
                  <span className="font-semibold ml-2 text-2xl">Users</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-meal/${props.meal.id}`}>
              <a className="text-indigo-600 shadow-lg border border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 px-2 md:px-10 justify-center text-center items-center">
                  <Database />
                  <span className="font-semibold ml-2 text-2xl">Meals</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-shopping/${props.meal.id}`}>
              <a className="text-indigo-600 border shadow-lg border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 md:px-10 justify-center text-center items-center">
                  <ShoppingCart />
                  <span className="font-semibold ml-2 text-2xl">Shoppings</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-deposit/${props.meal.id}`}>
              <a className="shadow-lg text-indigo-600 border  border-indigo-600 ml-4 px-3 py-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 md:px-10 justify-center text-center items-center">
                  <FilePlus />
                  <span className="font-semibold ml-2 text-2xl">Deposits</span>
                </span>
              </a>
            </Link>
            <Link href={`/meals/update-extra-cost/${props.meal.id}`}>
              <a className="text-indigo-600 shadow-lg border border-indigo-600 ml-4 px-3 py-2 my-2 inline-block  rounded-md text-xl hover:text-white hover:bg-indigo-500 transform transition ">
                <span className="flex md:py-6 md:px-10 justify-center text-center items-center">
                  <ShoppingBag />
                  <span className="font-semibold ml-2 text-2xl">
                    Extra Cost
                  </span>
                </span>
              </a>
            </Link>
          </div>
        </div>
        <MealRate meal={props.meal} />
        <div className="flex items-center justify-center border py-3 mt-14 w-full">
          <span className="text-lg font-semibold text-indigo-700 mr-6">
            Share with Friends:{" "}
          </span>
          <FacebookShareButton
            url={`https://meal-ui.vercel.app${router.asPath}`}
            quote={"Here's our this month meal calculation"}
            hashtag={"#mealCalculation"}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>{" "}
          <span className="mx-2"></span>
          <WhatsappShareButton
            url={`https://meal-ui.vercel.app${router.asPath}`}
            title={"Here's our this month meal calculation"}
            separator=":: "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <span className="mx-2"></span>
          <EmailShareButton
            url={`https://meal-ui.vercel.app${router.asPath}`}
            subject={"Meals for this months"}
            body="This is our meal calculation for this months."
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
    </CommonLayout>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meals?slug=${slug}`
  );
  const data = await res.json();

  return {
    props: {
      meal: data[0],
    }, // will be passed to the page component as props
  };
}
