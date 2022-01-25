import Head from "next/head";
import Link from "next/link";
import Cards from "../components/Cards/Cards";
import RowCard from "../components/commonComponents/RowCard";
import CommonLayout from "../components/layout/CommonLayout";

export default function Home(props) {
  return (
    <CommonLayout className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>My Meal Calculation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <RowCard />
        <Cards meals={props.data} />
      </main>
    </CommonLayout>
  );
}

// export async function getStaticProps(context) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/meals?_limit=6&_sort=id:DESC`
//   );
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//     revalidate: 100, // will be passed to the page component as props
//   };
// }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meals?_limit=6&_sort=id:DESC`
  );
  const data = await res.json();

  return {
    props: {
      data, // will be passed to the page component as props
    },

    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 100, // In seconds
  };
}
