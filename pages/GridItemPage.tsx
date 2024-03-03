"use client";
import "@/app/globals.css";
import React, { useState } from "react";
import Image from "next/image";
import OpenAI from "openai";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { FaUserCircle } from "react-icons/fa";

export default function GridItemPage() {
  const router = useRouter();
  const { candidate, party, office, imageUrl } = router.query;
  const [summary, setSummary] = useState("");
  const [news, setNews] = useState("");
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const { id } = useRouter().query;
  console.log(imageUrl);

  if (
    typeof candidate === "string" &&
    typeof party === "string" &&
    typeof office === "string"
  ) {
    if (summary === "" && news === "") {
      getInformation(candidate, party, office);
      getNews(candidate, party, office);
    }
  }

  async function getInformation(
    candidate: string,
    party: string,
    office: string
  ) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Give me the latest unbiased information about ${candidate}, who is ${office} and a member of the ${party} party. Include this person's age, and their policies. Respond in under 10 sentences.`,
            },
          ],
        },
      ],
      temperature: 0,
      top_p: 0,
    });
    console.log(completion.choices[0]);
    if (completion.choices[0].message.content) {
      setSummary(completion.choices[0].message.content);
    } else {
      setSummary(`Could not find any information on ${candidate}`);
    }
  }

  async function getNews(candidate: string, party: string, office: string) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Give me the latest unbiased news about ${candidate}, who is ${office} and a member of the ${party} party. Summarize in under 10 sentences.`,
            },
          ],
        },
      ],
      temperature: 0,
      top_p: 0,
    });
    console.log(completion.choices[0]);
    if (completion.choices[0].message.content) {
      setNews(completion.choices[0].message.content);
    } else {
      setNews(`Could not find any news about ${candidate}`);
    }
  }

  return (
    <Layout
      title="Local Lens"
      description="Get a better understanding of your local politicians and how you can leverage your rights to vote."
    >
      <div
        className="grid-item mt-40 space-y-10 bg-white p-10 rounded-lg shadow-lg"
        style={{ cursor: "pointer", textAlign: "center" }}
      >
        <h1 className="text-2xl font-bold" style={{ margin: "0 0 4px 0" }}>
          {candidate}
        </h1>
        <p className="text-xl font-semibold" style={{ margin: 10 }}>
          {office}
        </p>
        <p className="text-lg font-semibold" style={{ margin: 10 }}>
          {party}
        </p>
        <p
          className="text-left ml-[20%] mr-[20%]"
          style={{ textIndent: "20px" }}
        >
          {summary}
        </p>
        <p
          className="text-left ml-[20%] mr-[20%]"
          style={{ textIndent: "20px" }}
        >
          {news}
        </p>
      </div>
    </Layout>
  );
}
