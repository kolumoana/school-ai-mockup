"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
};

export const ChatbotUI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // ここでAIの応答を取得する処理を実装
    // 例: const response = await fetchAIResponse(input);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "申し訳ありませんが、まだAIの応答機能は実装されていません。",
      sender: "bot",
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`flex items-start ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar className="w-8 h-8">
                <AvatarFallback>{message.sender === "user" ? "👤" : "🤖"}</AvatarFallback>
              </Avatar>
              <div
                className={`mx-2 p-3 rounded-lg ${
                  message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-grow"
          />
          <Button type="submit">送信</Button>
        </form>
      </div>
    </div>
  );
};
