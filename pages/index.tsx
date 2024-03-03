import "@/app/globals.css";

import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import Hero from "../components/hero";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Home() {
    function getPlusCode(coordinates: Number[]) {
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        console.log("Coordinates:", coordinates);
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[0]},${coordinates[1]}&key=${API_KEY}&result_type=street_address`)
            .then(response => response.json())
            .then(data => {
                console.log("Plus code is:", data.plus_code.compound_code);
                return data.plus_code.compound_code;
        });
    }

    function getAddress(plusCode: any) {
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${plusCode}&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log("Address is:", data.results[0].formatted_address)
                getRepresentatives(data.results[0].formatted_address)
        })
    }

    function getRepresentatives(address: any) {
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${address}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                /*
                // offices
                data.offices.map((office: String) => {
                console.log(office)
                })
                // officials
                data.officials.map((official: String) => {
                console.log(official)
                })
                */
        })
    }

    function fetchAll() {
        global.navigator?.geolocation.getCurrentPosition((position) => {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            const coordinates = [position.coords.latitude, position.coords.longitude]
            getPlusCode(coordinates).then((plusCode) => {
                console.log("TEST", plusCode);
                getAddress(plusCode)
            });
        })
    }   

    fetchAll();

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
