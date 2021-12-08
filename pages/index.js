import Head from "next/head";
import Link from "next/link";
import CommonLayout from "../components/layout/CommonLayout";

export default function Home(props) {
  console.log(props);
  return (
    <CommonLayout className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>My Meal Calculation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Link href="/">
          <a className="text-indigo-600">
            <h1 className="text-4xl font-bold my-5">My Meal Calculation</h1>
          </a>
        </Link>

        <div className="flex  flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {props.data.map((meal) => (
            <Link key={meal.id} href={`/meals/${meal.slug}`}>
              <a className="p-6 mt-6 text-left border border-indigo-400 w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold"> {meal.title} &rarr;</h3>
                <p className="mt-4 text-lg">
                  Learn about Next.js in an interactive course with quizzes!
                </p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </CommonLayout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:1337/meals");
  const data = await res.json();

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
