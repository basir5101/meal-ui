import Link from "next/link";
import React from "react";

export default function Cards(props) {
  return (
    <div className="p-10 ali bg-indigo-50">
      <h1 className="text-3xl font-bold text-indigo-500 py-5 text-center">
        See Others Meal
      </h1>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {props.meals &&
          props.meals.map((meal) => (
            <Link key={meal.id} href={`/meals/${meal.slug}`}>
              <a>
                <div className="rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-indigo-700">
                      {" "}
                      {meal.title}{" "}
                    </div>
                    <p className="text-gray-700 text-base">
                      Created By{" "}
                      <span className="font-semibold uppercase">
                        {meal.user.username}
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}
