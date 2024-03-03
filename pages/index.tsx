import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import Hero from "../components/hero";
import Grid from "@/components/Grid";
import { Input } from "@/components/ui/input";

// Defines the structure for the politician data
interface Politician {
  id: number; // Unique identifier
  name: string; // Politician's name
  party: string; // Politician's party affiliation
  imageUrl: string; // URL for the politician's image
  office: string; // The office the politician holds
}

export default function Home() {
  // State management for address and zipcode inputs and politicians data
  const [address, setAddress] = useState("Newark, DE, USA");
  const [zipcode, setZipcode] = useState("19711");
  const [politicians, setPoliticians] = useState<Politician[]>([]);

  // Fetches representatives based on the current address state
  async function getRepresentatives() {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Your Google Civic Information API key
    console.log("Fetching representatives for address:", address);

    try {
      const response = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${address}`);
      const data = await response.json();

      // Maps office names to their respective officials
      const officeMap = new Map();
      data.offices.forEach((office: any) => {
        office.officialIndices.forEach((index: number) => {
          officeMap.set(index, office.name);
        });
      });

      // Processes the officials' data into a format suitable for the UI
      const processedOfficials = data.officials.map((official: any, index: number) => ({
        id: index,
        name: official.name,
        party: official.party || 'Unknown', // Default to 'Unknown' if no party is specified
        imageUrl: official.photoUrl || '', // Use an empty string if no image URL is provided
        office: officeMap.get(index) || 'Unknown Office', // Default to 'Unknown Office' if no office is found
      }));

      setPoliticians(processedOfficials);
    } catch (error) {
      console.error("Failed to get representatives:", error);
    }
  }

  // Updates the address state based on the input zipcode
  const updateAddressFromZipcode = (zipcode: string) => {
    setAddress(zipcode);
  };

  // useEffect hook to call getRepresentatives whenever the address state changes
  useEffect(() => {
    getRepresentatives();
    console.log("Politicians:", politicians);
  }, [address]);

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
          const newZipcode = e.target.value.trim();
          setZipcode(newZipcode); // Updates the zipcode state
          updateAddressFromZipcode(newZipcode); // Triggers an address update, which will in turn trigger data fetch
        }}
        className="w-1/8 text-center text-lg m-auto rounded-lg text-white"
        type="text"
        placeholder="Enter State"
      />
      <Grid politicians={politicians} />
    </Layout>
  );
}
