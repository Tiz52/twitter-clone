import {GetServerSideProps} from "next";
import type {NextPage} from "next";
import {useSession, getProviders, getSession} from "next-auth/react";
import {BuiltInProviderType} from "next-auth/providers";

import {
  Feed,
  Login,
  Modal,
  Sidebar,
  TwitterLayout,
  Widgets,
} from "../components";

interface Props {
  trendingResults: any;
  followResults: any;
  providers: any;
  session?: any;
}

const Home: NextPage<Props> = ({followResults, trendingResults, providers}) => {
  const {data: session} = useSession();

  if (!session) {
    return <Login providers={providers} />;
  }

  return (
    <TwitterLayout pageDescription="Twitter Clone" title="Home / Twitter">
      <header className="flex flex-col flex-auto items-end">
        <Sidebar />
      </header>
      <main className="flex flex-col flex-auto items-start">
        <div className="flex flex-auto xl:w-[990px] md:w-[660px]">
          <div className="flex w-full min-h-full flex-grow justify-between items-stretch">
            <Feed />
            <Widgets />
          </div>
        </div>
      </main>
      {/*Widgets*/}

      <Modal />
    </TwitterLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKE").then(
    (res) => res.json(),
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json(),
  );

  const providers = await getProviders();
  const session = await getSession(ctx);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
};
