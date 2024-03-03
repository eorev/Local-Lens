/* eslint-disable @next/next/no-img-element */
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { FaUserCircle } from "react-icons/fa";
import BarLoader from "@/components/barLoader";

export default function GridItemPage() {
    const router = useRouter();
    const { candidate, party, office, imageUrl } = router.query;
    const [summary, setSummary] = useState("");
    const [news, setNews] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    useEffect(() => {
        if (candidate && party && office && typeof candidate === 'string' && typeof party === 'string' && typeof office === 'string') {
            setIsLoading(true);
            Promise.all([
                getInformation(candidate, party, office),
                getNews(candidate, party, office)
            ]).then(() => {
                setIsLoading(false);
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
                            text: `Give me the latest unbiased information about ${candidate}, who is ${office} and a member of the ${party} party. Include this person's age, and their policies. Respond in under 10 sentences.  Do not mention when your latest information is from at all.`,
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
                            text: `Give me the latest unbiased news about ${candidate}, who is ${office} and a member of the ${party} party. Summarize in under 10 sentences.  Do not mention when your latest information is from at all.`,
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
                className="grid-item mt-40 space-y-10 bg-white p-10 rounded-lg shadow-lg"
                style={{ textAlign: "center" }}
            >


                <div className="flex justify-center">
                    {typeof imageUrl === 'string' ? (
                        <img className="rounded-full" src={imageUrl} alt={Array.isArray(candidate) ? candidate.join(' ') : candidate || "Candidate"} width={80} height={80} />
                    ) : (
                        <FaUserCircle size={80} style={{ marginBottom: "8px" }} />
                    )}
                </div>

                <h1 className="text-2xl font-bold">{candidate}</h1>
                <p className="text-xl font-semibold">{office}</p>
                <p className="text-lg font-semibold">{party}</p>
                {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                        <p>Fetching Unbiased Information...</p>
                        <BarLoader /> {/* Ensure BarLoader is centered within its container */}
                    </div>
                ) : (
                    <>
                        {summary && (
                            <>
                                <h2 className="response-header" style={{ margin: "20px 0 10px" }}>Summary</h2>
                                <div className="response-content" style={{ margin: "0 0 20px" }}>{summary}</div>
                            </>
                        )}
                        {news && (
                            <>
                                <h2 className="response-header" style={{ margin: "20px 0 10px" }}>News</h2>
                                <div className="response-content" style={{ margin: "0 0 20px" }}>{news}</div>
                            </>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}