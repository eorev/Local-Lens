import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import "@/styles/global.css";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/logo.png";

const ShuffleHero = () => {
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
        <p className="block mb-4 text-xs text-center md:text-sm font-semibold font-medium">
          See what's happening in your area and nationwide
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
