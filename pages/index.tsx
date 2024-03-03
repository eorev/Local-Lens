import "@/app/globals.css";

import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import Hero from "../components/hero";
import { AuthProvider } from "@/contexts/AuthContext";

function getLocation() {
  if (global.navigator?.geolocation) {
    global.navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  if (global.navigator?.geolocation) {
    global.navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

export default function Home() {
  getLocation();

  return (
    <AuthProvider>
      <Layout title="Home" description="The homepage of local lens.">
        <Head>
          <title>Local Lens</title>
          <meta
            name="description"
            content="Understand your politicians and how you can leverage your rights to vote."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Hero />
      </Layout>
    </AuthProvider>
  );
}
