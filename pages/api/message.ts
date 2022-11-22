import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { IMessage } from '../../typings';
import { pusher } from '../../utils/pusher';
import redis from '../../utils/redis';

interface IData {
  message?: IMessage;
  messages?: IMessage[];
}

interface IErrorData {
  stack: string;
}

const router = createRouter<
  NextApiRequest,
  NextApiResponse<IData | IErrorData>
>();

router.post(async (req, res) => {
  const message = req.body;
  console.log('apimes', message);
  const newMessage = {
    // Replace the timestamp of the user to the timestamp of the server
    ...message,
    created_at: Date.now(),
  };

  // push to upstash redis db
  await redis.hset('messages', message.id, JSON.stringify(newMessage));

  // push message to pusher
  pusher.trigger('messages', 'new-message', newMessage);

  res.status(200).json({ message: newMessage });
});

router.get(async (req, res) => {
  const messagesRes = await redis.hvals('messages');
  const messages = messagesRes
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.created_at - a.created_at);

  res.status(200).json({ messages });
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});
