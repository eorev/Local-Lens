import React, { useState } from "react";
import OpenAI from "openai";
import { Input } from "./ui/input";
import mascot from "../public/mascot.webp";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; message: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false); // New state to handle loading

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  async function handleQuestion() {
    if (!question.trim()) return; // Prevent sending empty questions
    setIsProcessing(true); // Start processing
    setChatHistory([...chatHistory, { role: "user", message: question }]); // Show user's question immediately
    const response = await getAnswer(question);
    setChatHistory(current => [...current, { role: "ai", message: response }]); // Update with AI's response
    setQuestion(""); // Clear input after sending
    setIsProcessing(false); // End processing
  }

  async function getAnswer(question: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4-0125-preview",
        messages: [{ role: "user", content: question }],
        temperature: 0.5,
        top_p: 1,
      });
      return completion.choices[0].message.content || "Sorry, I couldn't understand that.";
    } catch (error) {
      setIsProcessing(false); // Ensure processing is stopped in case of an error
      return `Error: ${(error as Error).message}. Try again in a few minutes.`;
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white"
        aria-label="Open chat"
      >
        Chat {/* Replace with SVG or image icon */}
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-96 p-4 bg-white border rounded-lg shadow-lg flex flex-col">
          <div className="overflow-y-auto h-64">
            {chatHistory.map((entry, index) => (
              <div key={index} className={`message ${entry.role === "ai" ? "text-left bg-gray-200" : "text-right bg-blue-200 text-black"} m-2 p-2 rounded-lg`}>
                {entry.message}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isProcessing && handleQuestion()}
              className="w-full p-2 border rounded text-white bg-gray-700"
              placeholder="Ask me anything!"
              disabled={isProcessing} // Disable input when processing
            />
          </div>
          <button
            onClick={handleQuestion}
            className={`mt-2 p-2 ${isProcessing ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded`}
            disabled={isProcessing} // Disable button when processing
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}

export default Chatbot;
