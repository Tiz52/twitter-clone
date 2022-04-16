import type {NextPage} from "next";
import Head from "next/head";

import {Sidebar} from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        {/*Feed*/}
        {/*Widgets*/}

        {/*Modal*/}
      </main>
    </div>
  );
};

export default Home;
