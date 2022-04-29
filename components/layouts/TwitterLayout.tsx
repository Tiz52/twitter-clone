import Head from "next/head";
import {FC, ReactNode} from "react";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode;
}
export const TwitterLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={pageDescription} name="description" />
        <meta content={title} name="og:title" />
        <meta content={pageDescription} name="og:description" />
        {imageFullUrl && <meta content={imageFullUrl} name="og:image" />}
      </Head>

      <div className="flex min-h-screen items-stretch">{children}</div>
    </>
  );
};
