import { unstable_getServerSession } from 'next-auth';
import React, { Suspense } from 'react';
import { IMessage } from '../typings';
import { getMessages } from '../utils/message';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import Providers from './providers';

async function HomePage() {
  const messages: IMessage[] = await getMessages();

  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <main>
        {/* MessageList */}
        <Suspense fallback={<p>Loading messages ...</p>}>
          <MessageList initialMessages={messages} />
        </Suspense>

        {/* ChatInput */}
        <Suspense fallback={<p>Loading input ...</p>}>
          <ChatInput session={session} />
        </Suspense>
      </main>
    </Providers>
  );
}

export default HomePage;
