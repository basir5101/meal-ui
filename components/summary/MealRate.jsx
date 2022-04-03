import React from "react";

export default function MealRate({ meal }) {
  let totalCost = 0;
  if (meal.shoppings.length > 0) {
    totalCost = meal.shoppings
      .map((item) => item.cost)
      .reduce((prev, next) => prev + next);
  }

  const meals = meal.names.map((name) =>
    name.values.map((value) => value.meal).reduce((prev, next) => prev + next)
  );

  let deposits = 0;

  try {
    deposits = meal.names.map((name) =>
      name.deposits
        .map((deposit) => deposit.amount)
        .reduce((prev, next) => prev + next)
    );
  } catch (error) {
    deposits = 0;
  }

  let totalMeal = 0;
  if (meals.length > 0) {
    totalMeal = meals.reduce((prev, next) => prev + next);
  }

  let totalDeposits = 0;
  if (deposits.length > 0) {
    totalDeposits = deposits.reduce((prev, next) => prev + next);
  }
  const mealRate = (totalCost / totalMeal).toFixed(1);

  let extraCost = 0;
  if (meal.extraCost.map((item) => item.amount).length > 0) {
    extraCost = meal.extraCost
      .map((item) => item.amount)
      .reduce((prev, next) => prev + next);
  }

  return (
    <div>
      <div className="md:mx-5">
        <div className="ml-3 my-4">
          <div className="p-10  gap-5">
            <div className="rounded overflow-hidden shadow-lg">
              <div className="px-6 h-32 text-center flex flex-col align-middle justify-center py-4">
                <div className="font-bold text-indigo-500 text-xl mb-2">
                  Meal Rate
                </div>
                <p className="text-gray-700 font-bold text-3xl">
                  {mealRate || 0}
                </p>
              </div>
            </div>
          </div>
          <h4 className="text-2xl text-indigo-700 my-3 font-bold">Summary: </h4>
          <table className="table-auto container text-center border-indigo-400 border">
            <thead className="border-b">
              <tr>
                <th className="py-3 border-r">Name</th>
                <th className="border-r">Meals</th>
                <th className="border-r">Meal Cost</th>
                <th className="border-r">Extra Cost</th>
                <th className="border-r">Deposit</th>
                <th className="border-r">Give</th>
                <th>Take</th>
              </tr>
            </thead>
            <tbody>
              {meal.names.map((value, index) => (
                <tr key={value.id} className="border-t">
                  <td className="py-3 border-r"> {value.name} </td>
                  <td className="border-r">
                    {value.values
                      .map((item) => item.meal)
                      .reduce((prev, next) => prev + next)}
                  </td>
                  <td className="border-r">
                    {(
                      mealRate *
                      value.values
                        .map((item) => item.meal)
                        .reduce((prev, next) => prev + next)
                    ).toFixed(1)}
                  </td>
                  <td className="border-r">
                    {(extraCost / meal.names.length).toFixed(1)}
                  </td>
                  <td className="border-r">
                    {value.deposits.length > 0
                      ? value.deposits
                          .map((item) => item.amount)
                          .reduce((prev, next) => prev + next)
                          .toFixed(1)
                      : 0}
                  </td>
                  <td className="border-r">
                    {value.deposits.length > 0 &&
                    value.deposits
                      .map((item) => item.amount)
                      .reduce((prev, next) => prev + next) <
                      mealRate *
                        value.values
                          .map((item) => item.meal)
                          .reduce((prev, next) => prev + next) +
                        extraCost / meal.names.length
                      ? (
                          mealRate *
                            value.values
                              .map((item) => item.meal)
                              .reduce((prev, next) => prev + next)
                              .toFixed(1) +
                          extraCost / meal.names.length -
                          value.deposits
                            .map((item) => item.amount)
                            .reduce((prev, next) => prev + next)
                            .toFixed(1)
                        ).toFixed(1)
                      : (value.deposits.length === 0 &&
                          (
                            mealRate *
                              value.values
                                .map((item) => item.meal)
                                .reduce((prev, next) => prev + next)
                                .toFixed(1) +
                            extraCost / meal.names.length
                          ).toFixed(1)) ||
                        0}
                  </td>
                  <td>
                    {value.deposits.length > 0 &&
                    value.deposits
                      .map((item) => item.amount)
                      .reduce((prev, next) => prev + next) >
                      mealRate *
                        value.values
                          .map((item) => item.meal)
                          .reduce((prev, next) => prev + next) +
                        extraCost / meal.names.length
                      ? (
                          value.deposits
                            .map((item) => item.amount)
                            .reduce((prev, next) => prev + next) -
                          (mealRate *
                            value.values
                              .map((item) => item.meal)
                              .reduce((prev, next) => prev + next) +
                            extraCost / meal.names.length)
                        ).toFixed(1)
                      : 0}
                  </td>
                </tr>
              ))}
              <tr className="border-t">
                <td className="border-r font-bold">Total: </td>
                <td className="py-3 border-r font-bold"> {totalMeal || 0}</td>
                <td className="py-3 border-r font-bold"> {totalCost || 0}</td>
                <td className="py-3 border-r font-bold"> {extraCost || 0} </td>
                <td className="py-3 border-r font-bold">
                  {totalDeposits || 0}
                </td>
                <td className="py-3 border-r font-bold"> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
