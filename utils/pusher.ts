import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const pusher = new Pusher({
  appId: process.env.PUSHER_SERVER_APP_ID!,
  key: process.env.pusher_client_key!,
  secret: process.env.PUSHER_SERVER_SECRET!,
  cluster: process.env.pusher_client_cluster!,
  useTLS: process.env.PUSHER_SERVER_TLS as boolean | undefined,
});

export const clientPusher = new ClientPusher(process.env.pusher_client_key!, {
  cluster: process.env.pusher_client_cluster,
  forceTLS: process.env.pusher_client_tls as boolean | undefined,
});
