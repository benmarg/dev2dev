import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-fit">
        <div className="flex min-h-screen">
        <div className="absolute mt-16 w-full text-center text-2xl font-bold text-white">Dev2Dev is an easy to use platform that pairs developers who need help,<br /> with more experienced developers who have expertise specific to the problems <br /> they&apos;re trying to solve! To get started, choose one of the options below</div>
          <div className="w-[50%] flex flex-col gap-6 justify-center items-center bg-gradient-to-b from-[#7031c9] to-[#151fd5]">
            <h2 className="text-6xl font-bold text-white">I have a question!</h2>
            <Link
            type="button"
            href="/askquestion"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            Ask a question
           </Link>
          </div>
          <div className="w-[50%] flex flex-col gap-6 justify-center items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h2 className="text-6xl font-bold text-white">I have an answer!</h2>
            <Link
            href="/answerquestion"
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            Answer a question
           </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
