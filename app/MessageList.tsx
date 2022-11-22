'use client';
import React, { useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { IMessage } from '../typings';
import { getMessages } from '../utils/message';
import { clientPusher } from '../utils/pusher';
import Message from './Message';

interface IMessageListProps {
  initialMessages: IMessage[];
}

function MessageList({ initialMessages }: IMessageListProps) {
  const { mutate } = useSWRConfig();
  const { data: messages } = useSWR<IMessage[]>(
    '/api/getMessages',
    getMessages
  );

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', async (data: IMessage) => {
      // if you sent the message, no need to update cache
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate('/api/getMessages', getMessages);
      } else {
        const options = {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        };
        mutate('/api/getMessages', getMessages, options);
      }
    });

    // cleaup
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <section className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </section>
  );
}

export default MessageList;
