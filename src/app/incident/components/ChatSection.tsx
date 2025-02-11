// File: src/components/ChatSection.tsx

"use client";

import React, { useEffect, useRef } from "react";

interface ChatSectionProps {
  incidentId: string; // incident_id string
  messages: Message[]; // Will be used for rendering the chat
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>; // For future updates
  handleSendMessage: (message: string) => Promise<void>; // Function to send messages
  loading: boolean; // Tracks the send operation's state
  error: string | null; // Error state to show in the UI
}

interface Message {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  incidentId,
  messages,
  setMessages, // Retained for future use
  handleSendMessage,
  loading,
  error,
}) => {
  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  console.log(setMessages);
  console.log(incidentId);
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await handleSendMessage(input);
      setInput(""); // Clear the input after sending
    } catch {
      // Error is already handled in parent
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Display */}
      <div className="flex-grow overflow-y-auto border border-black rounded-lg p-4 bg-white">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="mb-4">
              <p className="text-base text-black">
                <strong>{msg.senderId === "admin" ? "Admin" : "You"}:</strong>{" "}
                {msg.message}
              </p>
              <p className="text-xs text-gray-600">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No messages yet.</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="flex mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="flex-grow px-4 py-2 border border-black rounded-l-lg focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="Type your message..."
          aria-label="Type your message"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition duration-300 focus:outline-none"
          aria-label="Send message"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatSection;
