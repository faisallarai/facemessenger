import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { IMessage } from '../typings';
import TimeAgo from 'react-timeago';

interface IMessageProps {
  message: IMessage;
}

function Message({ message }: IMessageProps) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          className="rounded-full mx-2"
          src={message.profilePic}
          height={10}
          width={50}
          alt={message.username}
        />
      </div>

      <div>
        <p
          className={`text-[10.4px] px-[2px] pb-[2px] ${
            isUser ? 'text-blue-400 text-right' : 'text-red-400 text-left'
          } text-red-400`}
        >
          {message.username}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? 'bg-blue-400 ml-auto order-2' : 'bg-red-400'
            }`}
          >
            <p>{message.message}</p>
          </div>

          <p
            className={`text-[10.4px] italic px-2 text-gray-300 ${
              isUser && 'text-right'
            }`}
          >
            <TimeAgo date={new Date(message.created_at)} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
