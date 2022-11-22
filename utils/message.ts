import { IMessage } from '../typings';

export const sendMessage = async (body: IMessage, msgs: IMessage[]) => {
  const res = await fetch(
    `${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_HOST}/api/message`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  const message: IMessage = data.message;
  return [message, ...msgs];
};

export const getMessages = async () => {
  const res = await fetch(
    `${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_HOST}/api/message`
  );
  const data = await res.json();
  const messages: IMessage[] = data.messages;
  return messages;
};
