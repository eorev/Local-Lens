import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import "@/styles/global.css";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/logo.png";

const ShuffleHero = () => {

  function getPlusCode(coordinates: Number[]) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    console.log("Coordinates:", coordinates);
    // Return the fetch promise chain
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
    // offices
    data.offices.map((office: String) => {
      console.log(office)
    })
    // officials
    data.officials.map((official: String) => {
      console.log(official)
    })
  })
}

function fetchAll() {
  global.navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      const coordinates = [position.coords.latitude, position.coords.longitude]
      getPlusCode(coordinates).then((plusCode) => {
        console.log("TEST", plusCode);
        getAddress(plusCode)
    });
  })
}   


  return (
    <section className="mt-20">
      <div>
        <Image
          className="m-auto"
          src={logo.src}
          width={400}
          height={400}
          alt="logo"
        />
        <p className="block mb-4 text-xs text-center md:text-sm font-medium">
          See what&apos;s happening in your area and nationwide
        </p>
        <h3 className="text-4xl md:text-6xl text-center font-semibold text-primary">
          Get Informed.
        </h3>
        <p className="text-base font-semibold text-center md:text-lg my-4 md:my-6">
          Understand your local politicians and how you can leverage your rights
          to vote
        </p>
        <Input
          className="w-1/3 m-auto rounded-lg"
          type="email"
          placeholder="Enter Zipcode"
        />
      </div>
    </section>
  );
};

export default ShuffleHero;
