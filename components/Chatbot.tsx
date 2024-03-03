"use client";
import React, { useState } from "react";
import OpenAI from "openai";
import { Input } from "./ui/input";
import mascot from "../public/mascot.webp";

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  function handleQuestion() {
    getAnswer(question);
  }

  async function getAnswer(question: string) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an assisstant for those who want to learn about politics. ${question}`,
            },
          ],
        },
      ],
      temperature: 0,
      top_p: 0,
    });
    console.log(completion.choices[0]);
    if (completion.choices[0].message.content) {
      setAnswer(completion.choices[0].message.content);
    } else {
      setAnswer(`Error. Try again in a few minutes.`);
    }
    let tmpMessages = [...messages, answer];
    setMessages(tmpMessages);

    let tmpAnswers = [...answers, question];
    setAnswers(tmpAnswers);
  }

  return (
    <div className="container absolute mt-[82vh] flex flex-col bg-gray-100 justify-center">
      <div className="top border">
        <div className="messages container">
          <div className="message column">
            {messages.map((message: string) => {
              return (
                <div className="text" key={message}>
                  {message}
                </div>
              );
            })}
          </div>
          <div className="message column">
            {answers.map((message: string) => {
              return (
                <div className="text" key={answer}>
                  {answer}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="input">
        <Input
          onChange={(e) => {
            const newQuestion = e.target.value.trim();
            setQuestion(newQuestion);
          }}
          className="w-1/8 text-center text-lg m-auto rounded-lg text-white"
          type="text"
          placeholder="Ask me anything!"
        />
      </div>
      <button
        className="text-black bg-neutral-400 p-2 w-fit m-auto rounded-full"
        onClick={() => handleQuestion()}
      >
        Send
      </button>
    </div>
  );
}

export default Chatbot;
