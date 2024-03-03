import "@/app/globals.css";

import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import Hero from "../components/hero";
import { use, useEffect, useState } from "react";
import { set } from "firebase/database";
import Grid from "@/components/Grid";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [address, setAddress] = useState("Newark, DE, USA");
  const [zipcode, setZipcode] = useState("19711");
  const [offices, setOffices] = useState([]);
  const [officials, setOfficials] = useState([]);
  // Make sure to handle errors appropriately in a real application
  async function getPlusCode(coordinates: Number[]) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    console.log("Coordinates:", coordinates);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[0]},${coordinates[1]}&key=${API_KEY}&result_type=street_address`
      );
      const data = await response.json();
      console.log("Plus code is:", data.plus_code.compound_code);
      return data.plus_code.compound_code;
    } catch (error) {
      console.error("Failed to get plus code:", error);
    }
  }

  async function getAddress(plusCode: String) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${plusCode}&key=${API_KEY}`
      );
      const data = await response.json();
      console.log("Address is:", data.results[0].formatted_address);
      if (data.results[0].formatted_address) {
        setAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error("Failed to get address:", error);
    }
  }

  async function getRepresentatives() {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    try {
      const response = await fetch(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${address}`
      );
      const data = await response.json();
      console.log(data);
      setOffices(data.offices);
      setOfficials(data.officials);
      // Example processing (commented out)
      // data.offices.map((office) => console.log(office));
      // data.officials.map((official) => console.log(official));
      offices.map((office) => console.log(office));
      officials.map((official) => console.log(official));
    } catch (error) {
      console.error("Failed to get representatives:", error);
    }
  }

  async function fetchAll() {
    if (global.navigator && global.navigator.geolocation) {
      global.navigator.geolocation.getCurrentPosition(async (position) => {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const coordinates = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        try {
          const plusCode = await getPlusCode(coordinates);
          console.log("TEST", plusCode);
          await getAddress(plusCode);
        } catch (error) {
          console.error("Failed in fetchAll:", error);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getAddress(zipcode);
    getRepresentatives();
  }, [zipcode]);

  useEffect(() => {
    fetchAll();
    getRepresentatives();
    officials.map((official) => console.log(official));
    offices.map((office) => console.log(office));
  }, []);

  return (
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
      <Input
        onChange={(e) => setZipcode(e.target.value)}
        className="w-1/8 text-center text-lg m-auto rounded-lg text-white"
        type="email"
        placeholder="Enter State"
      />
      <Grid />
    </Layout>
  );
}
