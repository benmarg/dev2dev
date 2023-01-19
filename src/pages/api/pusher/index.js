import Pusher from "pusher";

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

export default async function handler(req, res) {
  const { message, sender, channel } = req.body;
  await pusher.trigger(channel, "chat-event", {
    message,
    sender,
  });

  res.json({ message: "completed" });
}