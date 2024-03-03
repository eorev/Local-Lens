import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function GridItemPage() {
    const router = useRouter();
    const { candidate, party, office, imageUrl } = router.query;
    const [summary, setSummary] = useState("");
    const [news, setNews] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Unified loading state
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    useEffect(() => {
        if (candidate && party && office && typeof candidate === 'string' && typeof party === 'string' && typeof office === 'string') {
            setIsLoading(true); // Start loading
            Promise.all([
                getInformation(candidate, party, office),
                getNews(candidate, party, office)
            ]).then(() => {
                setIsLoading(false); // Stop loading once both promises are resolved
            });
        }
    }, [candidate, party, office]);

    async function getInformation(candidate: string, party: string, office: string) {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-0125-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Give me the latest unbiased information about ${candidate}, who is ${office} and a member of the ${party} party. Include this person's age, and their policies. Do not under any circumstance include when this information was found. Respond in under 10 sentences.`,
                        },
                    ],
                },
            ],
            temperature: 0,
            top_p: 0,
        });
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
                            text: `Give me the latest unbiased news about ${candidate}, who is ${office} and a member of the ${party} party. Do not under any circumstance include when this information was found. Summarize in under 10 sentences.`,
                        },
                    ],
                },
            ],
            temperature: 0,
            top_p: 0,
        });
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
                className="grid-item mt-40 space-y-10 bg-white p-10 rounded-lg shadow-lg cursor-none"
                style={{ cursor: "pointer", textAlign: "center" }}
            >
                <div className="flex justify-center">
                    {imageUrl && typeof imageUrl === 'string' ? (
                        <Image className="rounded-full" src={imageUrl} alt="Candidate" width={80} height={80} />
                    ) : (
                        <FaUserCircle size={80} style={{ marginBottom: "8px" }} />
                    )}
                </div>

                <h1 className="text-2xl font-bold" style={{ margin: "0 0 4px 0" }}>
                    {candidate}
                </h1>
                <p className="text-xl font-semibold" style={{ margin: 10 }}>
                    {office}
                </p>
                <p className="text-lg font-semibold" style={{ margin: 10 }}>
                    {party}
                </p>
                {isLoading ? (
                    <p>Fetching Unbiased Information...</p>
                ) : (
                    <>
                        <div className="text-left ml-[10%] mr-[10%]" style={{ textIndent: "20px" }}>
                            <p>{summary}</p>
                        </div>
                        <div className="text-left ml-[10%] mr-[10%]" style={{ textIndent: "20px" }}>
                            <p>{news}</p>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
