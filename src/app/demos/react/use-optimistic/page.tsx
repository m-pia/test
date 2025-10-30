'use client';

import { useOptimistic, useState, useRef } from 'react';

// This is a simplified version of a chat message object
type Message = { text: string; sending?: boolean };

export default function UseOptimisticPage() {
  const [messages, setMessages] = useState<Message[]>([{ text: 'Hello there!' }]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: Message[], newMessage: string) => [...state, { text: newMessage, sending: true }]
  );
  const formRef = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    const message = formData.get('message') as string;
    addOptimisticMessage(message);
    formRef.current?.reset();

    // Simulate a network request
    await new Promise((res) => setTimeout(res, 2000));

    setMessages((messages) => [...messages, { text: message }]);
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-3xl font-bold text-white mb-4">React 19 useOptimistic Hook Demo</h1>
      <p className="text-gray-400 mb-6">Optimistically update the UI before the server action completes.</p>
      
      <div className="space-y-4">
        {optimisticMessages.map((message, index) => (
          <div key={index} className="flex items-center space-x-2">
            <p className={`p-2 rounded-lg ${message.sending ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-700 text-white'}`}>
              {message.text}
            </p>
          </div>
        ))}
      </div>

      <form action={formAction} ref={formRef} className="mt-6 flex">
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-grow bg-gray-700 text-white rounded-l-lg px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  );
}
