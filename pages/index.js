import Head from "next/head";
import Link from "next/link";
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
      </main>
    </CommonLayout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`);
  const data = await res.json();

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
