import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import "@/styles/global.css";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/logo.png";

const ShuffleHero = () => {
  return (
    <section className="mt-20 flex flex-col items-center justify-center">
      <Image
        className="m-auto"
        src={logo}
        width={400}
        height={400}
        alt="logo"
        priority
      />
      <h3 className="text-4xl md:text-6xl text-center font-semibold text-gray-800 my-4">
        Local Lens
      </h3>
      <p className="block mb-6 text-center text-sm font-medium text-gray-600">
        See what&apos;s happening in your area and nationwide
      </p>
    </section>
  );
};

export default ShuffleHero;
