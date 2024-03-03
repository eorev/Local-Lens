import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import Hero from "../components/hero";
import Grid from "@/components/Grid";
import { Input } from "@/components/ui/input";

interface Politician {
  id: number;
  name: string;
  party: string;
  imageUrl: string; // Ensure this is correctly populated or handled if missing
}

export default function Home() {
  const [address, setAddress] = useState("Newark, DE, USA");
  const [zipcode, setZipcode] = useState("19711");
  const [politicians, setPoliticians] = useState<Politician[]>([]);

  async function getRepresentatives() {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    console.log("Fetching representatives for address:", address);
    try {
      const response = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${address}`);
      const data = await response.json();
      console.log("API response:", data);

      const processedOfficials = data.officials.map((official: any, index: number) => ({
        id: index,
        name: official.name,
        party: official.party || 'Unknown', // Default to 'Unknown' if party is not provided
        imageUrl: official.photoUrl || '', // Handle missing photoUrl
      }));
      console.log("Processed officials:", processedOfficials);

      setPoliticians(processedOfficials);
    } catch (error) {
      console.error("Failed to get representatives:", error);
    }
  }

  useEffect(() => {
    getRepresentatives();
  }, [address]);

  console.log("Politicians to pass to Grid:", politicians);

  return (
    <Layout title="Home" description="The homepage of local lens.">
      <Head>
        <title>Local Lens</title>
        <meta name="description" content="Understand your politicians and how you can leverage your rights to vote." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Input
        onChange={(e) => {
          const newZipcode = e.target.value;
          console.log("Zipcode changed to:", newZipcode);
          setZipcode(newZipcode);
          // Optionally trigger an address update based on the new zipcode here
        }}
        className="w-1/8 text-center text-lg m-auto rounded-lg text-white"
        type="text"
        placeholder="Enter State"
      />
      <Grid politicians={politicians} />
    </Layout>
  );
}
