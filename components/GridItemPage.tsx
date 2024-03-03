"use client";
// GridItem.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import OpenAI from "openai";

// Define a type for the props expected by GridItem
interface GridItemProps {
  candidate: string;
  party: string;
  office: string;
  imageUrl: string;
}

const GridItem: React.FC<GridItemProps> = ({
  candidate,
  party,
  office,
  imageUrl,
}) => {
  const [summary, setSummary] = useState("");
  const openai = new OpenAI();

  /*
    useEffect(() => {
        getInformation(candidate, party, office);
    }, [])
    */

  async function getInformation(
    candidate: String,
    party: String,
    office: String
  ) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Give me the latest information about ${candidate}, ${office}, of the ${party} party. Include this person's age, and their policies. Respond in under 10 sentences.`,
            },
          ],
        },
      ],
      temperature: 0,
    });
    console.log(completion.choices[0]);
  }

  return (
    <div
      className="grid-item"
      style={{ cursor: "pointer", textAlign: "center" }}
    >
      <h1 style={{ margin: "0 0 4px 0" }}>{candidate}</h1>
      <Image
        src={imageUrl}
        alt={candidate}
        style={{ width: "100%", height: "auto", marginBottom: "8px" }}
      />
      <p style={{ margin: 10 }}>{office}</p>
      <p style={{ margin: 10 }}>{party}</p>
      <p style={{ margin: 0 }}>{summary}</p>
    </div>
  );
};

export default GridItem;
