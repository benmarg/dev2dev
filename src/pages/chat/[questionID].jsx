import { useEffect, useState, useContext, useRef } from "react";
import useSessionStorage from "./useSessionStorage";
import Pusher from "pusher-js";
import axios from "axios";
import { useUser } from "../UserContext";
import { useRouter } from "next/router";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism.css";

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
  const { user } = useUser();
  const { question, language, code } = user;
  const router = useRouter();
  const scrollToEnd = useRef(null);
  const [questionID, setQuestionID] = useState(null);
  const [nickname, setNickname] = useState("Anonymous")

  useEffect(()=>{
    if(!router.isReady) return;
    setQuestionID(router.query.questionID);
    setNickname(router.query.nickname)
}, [router.isReady]);

  useEffect(() => {
    scrollToEnd.current?.scrollIntoView({ behavior: 'smooth', block: "end" , inline: "nearest"})
  }, [chats])

  useEffect(() => {
    console.log("running");
    if(!questionID) return;
    
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "us3",
    });

    const privateChannel = pusher.subscribe(questionID);

    privateChannel.bind("chat-event", function (data) {
      if(!data) return;
      console.log("running bind");
      setChats((prevState) => [
        ...prevState,
        { sender: data.sender, message: data.message, timeSent: data.timeSent},
      ]);
    }, privateChannel.unbind());

    const cleanup = () => {
      pusher.unsubscribe(questionID);
    }

    window.addEventListener('beforeunload', cleanup);

    return () => {
      cleanup();
      window.removeEventListener('beforeunload', cleanup);
    };

  }, [questionID]);

  function getLanguage() {
    console.log(language);
		switch (language) {
			case "javascript":
				return languages.js;
			case "python":
				return languages.python;
			case "java":
				return languages.java;
			case "c++":
				return languages.cpp;
			case "typescript":
				return languages.typescript;
		}
	}

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/pusher", { message: messageToSend, sender:nickname, channel: questionID });
    setMessageToSend(""); 
  };

  return(
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl text-white font-bold text-center">Question: {question}</h1>
        <h1 className="text-2xl text-white font-bold text-center">Language: {language}</h1>
        {console.log("lang:", language)}
        <Editor
						value={code}
						highlight={(code) => highlight(code, getLanguage())}
						ignoreTabKey={false}
						padding={10}
						style={{
							fontFamily: '"Fira code", "Fira Mono", monospace',
							fontSize: 14,
							backgroundColor: "white",
							height: "30rem"
						}}
            disabled={true}
					/>
      </div>
      <div className="h-[50%] min-w-[30%] max-w-[50%] overflow-scroll space-y-8 flex flex-col">
      {chats.map((chat) => (
          chat.sender === nickname ? 
          <div key={chat.timeSent} className="w-fit break-words max-w-[75%] place-self-end">
          <div className="place-self-start text-left">
            <div className="bg-gray-100 p-5 rounded-2xl rounded-tl-none">
                {chat.message}
            </div>
            <p className="text-sm text-gray-300 ">{chat.sender}</p>
         </div>
        </div>
        :
        <div key={chat.timeSent}className="w-fit break-words max-w-[75%] place-self-start">
          <div className="place-self-end text-left">
              <div className="bg-green-50 text-green-900 p-5 rounded-2xl rounded-tr-none">
                  {chat.message}
              </div>
              <p className="text-sm text-gray-300 ">{chat.sender}</p>
          </div>
        </div>
        
      ))}
          <div ref={scrollToEnd}></div>
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