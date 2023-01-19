import { useEffect, useState, useContext, useRef } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useUser } from "../UserContext";
import { useRouter } from "next/router";

const Chat = () => {
  return (
    <>
    <div className="h-screen flex flex-col justify-between bg-gradient-to-b from-[#7031c9] to-[#151fd5]">
      <div>
        <h1 className="text-4xl text-white font-bold text-center">Chat</h1>
      </div>
      <ChatBox />   
    </div>
       
    </>
  );
};

function ChatBox(){
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const { user: { nickname, question, code, language }}= useUser();
  const router = useRouter();
  const { questionID } = router.query;
  const scrollToEnd = useRef(null);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "us3",
    });

    console.log(questionID);
    const privateChannel = pusher.subscribe(questionID);

    privateChannel.bind("chat-event", function (data) {
      setChats((prevState) => [
        ...prevState,
        { sender: data.sender, message: data.message },
      ]);
      scrollToEnd.current?.scrollIntoView({ behavior: 'smooth' })
    });

    return () => {
      pusher.unsubscribe(questionID);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/pusher", { message: messageToSend, sender:nickname, channel: questionID });
  };

  return(
    <>
      <div className="max-h-[50%] min-w-[30%] overflow-scroll mx-auto space-y-12 grid grid-cols-1">
      {chats.map((chat, id) => (
          <div>
          {chat.sender !== nickname ? 
          <div className="place-self-start text-left">
            <div className="bg-gray-100 p-5 rounded-2xl rounded-tl-none">
                {chat.message}
            </div>
            <p className="text-sm text-gray-300 ">{chat.sender}</p>
            
        </div>
        :
        <div className="place-self-end text-right">
            <div className="bg-green-50 text-green-900 p-5 rounded-2xl rounded-tr-none">
                {chat.message}
            </div>
            <p className="text-sm text-gray-300 ">{chat.sender}</p>
        </div>
      
        }
            <div ref={scrollToEnd}></div>
          </div>
      ))}
    </div>

        <form onSubmit={(e) => {handleSubmit(e)}}>
        <input
          type="text"
        value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
            placeholder="start typing...."
        />
  <button
  type="submit"
  >
  Send
  </button>
  </form>
</>
  )
}

export default Chat;