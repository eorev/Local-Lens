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
  imageUrl: string;
  office: string;
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

      const officeMap = new Map();
      data.offices.forEach((office: any) => {
        office.officialIndices.forEach((index: number) => {
          officeMap.set(index, office.name);
        });
      });

      const processedOfficials = data.officials.map((official: any, index: number) => ({
        id: index,
        name: official.name,
        party: official.party || 'Unknown',
        imageUrl: official.photoUrl || '',
        office: officeMap.get(index) || 'Unknown Office',
      }));

      setPoliticians(processedOfficials);
    } catch (error) {
      console.error("Failed to get representatives:", error);
    }
  }

  const updateAddressFromZipcode = (zipcode: string) => {
    setAddress(zipcode);
  };

  useEffect(() => {
    getRepresentatives();
    console.log("Politicians:", politicians)
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
          setZipcode(newZipcode);
          updateAddressFromZipcode(newZipcode);
        }}
        className="w-1/8 text-center text-lg m-auto rounded-lg text-white"
        type="text"
        placeholder="Enter State"
      />
      <Grid politicians={politicians} />
    </Layout>
  );
}
