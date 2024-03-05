import { motion } from "framer-motion";
import React from "react";
import "@/styles/global.css";
import Image from "next/image";
import logo from "@/public/logo.png";

const ShuffleHero = () => {
  return (
    <section className="mt-20 flex flex-col items-center justify-center">
      <Image
        src={logo}
        width={400}
        height={400}
        alt="Local Lens logo"
        priority
      />
      <h3 className="text-4xl md:text-6xl text-center font-semibold my-4" style={{ color: '#374151' }}> {/* Neutral color */}
        Local Lens
      </h3>
      <p className="mb-6 text-center text-sm font-medium" style={{ color: '#6B7280' }}> {/* Neutral color */}
        Discover what&apos;s happening in your area and nationwide
      </p>
    </section>
  );
};

export default ShuffleHero;
