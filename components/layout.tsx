import React, { ReactNode } from "react";
import Head from "next/head";
import RevealHeader from "react-revealheader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userdefault from "@/public/user-default.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Navbar from "./navbar";

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Local Lens",
  description = "Get a better understanding of your local politicians and how you can leverage your rights to vote.",
}) => {
  return (
    <>
      <Navbar></Navbar>
      {/* <RevealHeader upColor="red" neutralColor="red">
        <Navbar></Navbar>
        <div className="max-w-[1080] p-2 flex place-content-around items-center"></div>
      </RevealHeader> */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-secondary text-gray-800">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </>
  );
};

export default Layout;
