"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import OpenAI from "openai";
import { useRouter } from 'next/router';


export default function GridItemPage() {
    const router = useRouter();
    const {candidate, party, office, imageUrl } = router.query
    const [summary, setSummary] = useState('')
    const [news, setNews] = useState('')
    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

    
    const { id } = useRouter().query;

    if (typeof candidate === 'string' && typeof party === 'string' && typeof office === 'string') {
        if (summary === '' && news === '') {
            getInformation(candidate, party, office);
            getNews(candidate, party, office)
        }
    }

    async function getInformation(candidate: string, party: string, office: string) {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-0125-preview",
            messages: [
                {
                role: "user",
                content: [
                    { type: "text", text: `Give me the latest unbiased information about ${candidate}, who is ${office} and a member of the ${party} party. Include this person's age, and their policies. Respond in under 10 sentences.`},
                ],
                },
            ],
            temperature: 0,
        });
        console.log(completion.choices[0]);
        if (completion.choices[0].message.content) {
            setSummary(completion.choices[0].message.content )
        }
        else {
            setSummary(`Could not find any information on ${candidate}`)
        }
    }

    async function getNews(candidate: string, party: string, office: string) {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-0125-preview",
            messages: [
                {
                role: "user",
                content: [
                    { type: "text", text: `Give me the latest unbiased news about ${candidate}, who is ${office} and a member of the ${party} party. Summarize in under 10 sentences.`},
                ],
                },
            ],
            temperature: 0,
        });
        console.log(completion.choices[0]);
        if (completion.choices[0].message.content) {
            setNews(completion.choices[0].message.content )
        }
        else {
            setNews(`Could not find any news about ${candidate}`)
        }
    }

    return (
        <div className="grid-item" style={{ cursor: 'pointer', textAlign: 'center' }}>
            <h1 style={{ margin: '0 0 4px 0' }}>{candidate}</h1>
            <p style={{ margin: 10 }}>{office}</p>
            <p style={{ margin: 10 }}>{party}</p>
            <p style={{ margin: 10 }}>{summary}</p>
            <p style={{ margin: 10 }}>{news}</p>
        </div>
    );
}