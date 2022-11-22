'use client';

import { unstable_getServerSession } from 'next-auth';
import React, { FormEvent, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { v4 as uuid } from 'uuid';
import { IMessage } from '../typings';
import { getMessages, sendMessage } from '../utils/message';

interface IChatProps {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
}

function ChatInput({ session }: IChatProps) {
  const [input, setInput] = useState('');
  const { mutate } = useSWRConfig();
  const { data: messages } = useSWR('/api/getMessages', getMessages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;

    setInput('');

    const id = uuid();
    const newMessage: IMessage = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    // const message = await sendMessage(newMessage);
    // console.log('MESSAGE ADDED >>>', message);
    const options = {
      optimisticData: [newMessage, ...messages!],
      rollbackOnError: true,
    };

    await mutate(
      '/api/getMessages',
      sendMessage(newMessage, messages!),
      options
    );
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 bg-white w-full flex px-10 py-5 space-x-2"
    >
      <input
        type="text"
        disabled={!session}
        placeholder="Enter message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={!input}
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
