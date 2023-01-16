import { pusher } from "../../chatroom";

export default async (req, res) => {
    const { channel_name, socket_id, username } = req.body;

    const randomString = Math.random().toString(36).substring(7);

    const presenceData = {
        user_id: randomString,
        user_info: {
            username,
        },
    };

    try{
        const auth = pusher.authorizeChannel(socket_id, channel_name, presenceData);
    }
    catch(err){
        console.log(err);
    }
}