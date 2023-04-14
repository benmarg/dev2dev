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
			<div className="flex h-fit flex-col justify-between bg-gradient-to-b from-[#7031c9] to-[#151fd5]">
				<div>
					<h1 className="text-center text-4xl font-bold text-white my-2">
						Chat
					</h1>
				</div>
				<ChatBox />
			</div>
		</>
	);
};

function ChatBox() {
	const [messageToSend, setMessageToSend] = useState("");
	const { user, setUser } = useUser();
	const { question, language, code, chats } = user;
	const router = useRouter();
	const scrollToEnd = useRef(null);
	const [questionID, setQuestionID] = useState(null);
	const [nickname, setNickname] = useState("Anonymous");

	console.log("user: ", user);
	useEffect(() => {
		if (!router.isReady) return;
		setQuestionID(router.query.questionID);
		setNickname(router.query.nickname);
	}, [router.isReady]);

	useEffect(() => {
		scrollToEnd.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "nearest"
		});
	}, [chats]);

	useEffect(() => {
		console.log("running");
		if (!questionID) return;

		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: "us3"
		});

		const privateChannel = pusher.subscribe(questionID);

		privateChannel.bind("chat-event", function (data) {
			if (!data) return;
			console.log("running bind");

			setUser((prevUser) => ({
				...prevUser,
				chats: [
					...prevUser.chats,
					{
						sender: data.sender,
						message: data.message,
						timeSent: data.timeSent
					}
				]
			}));
		});

		const cleanup = () => {
			pusher.unsubscribe(questionID);
			setUser({
		nickname: "Anonymous",
		question: "",
		language: "",
		code: "",
		chats: []
	})
		};

		window.addEventListener("beforeunload", cleanup);

		return () => {
			cleanup();
			window.removeEventListener("beforeunload", cleanup);
		};
	}, [questionID, setUser]);

	function getLanguage() {
		if (!language) return languages.js;
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
		axios.post("/api/pusher", {
			message: messageToSend,
			sender: nickname,
			channel: questionID
		});
		setMessageToSend("");
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-center text-2xl font-bold text-white">
					Question: {question}
				</h1>
				<h1 className="mb-4 text-center text-2xl font-bold text-white">
					Language: {language.charAt(0).toUpperCase() + language.slice(1)}
				</h1>
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
					className="max-h-[60%] w-[60%] overflow-scroll"
					disabled={true}
				/>
				<div className="flex flex-col items-center w-[60%] pb-5">
					<div className="flex h-[36rem] w-full flex-col space-y-8 overflow-scroll bg-white">
						{chats.map((chat) =>
							chat.sender !== nickname ? (
								<div
									key={chat.timeSent}
									className="w-fit max-w-[75%] place-self-start break-words px-4"
								>
									<div className="place-self-end text-left">
										<div className="rounded-2xl rounded-tl-none bg-gray-100 p-5">
											{chat.message}
										</div>
										<p className="text-sm text-gray-300 ">
											{chat.sender}
										</p>
									</div>
								</div>
							) : (
								<div
									key={chat.timeSent}
									className="w-fit max-w-[75%] place-self-end break-words px-4"
								>
									<div className="place-self-start text-left">
										<div className="rounded-2xl rounded-tr-none bg-green-50 p-5 text-green-900">
											{chat.message}
										</div>
										<p className="text-sm text-gray-300 ">
											{chat.sender}
										</p>
									</div>
								</div>
							)
						)}
						<div ref={scrollToEnd}></div>
					</div>
					<form
						onSubmit={(e) => {
							handleSubmit(e);
						}}
            className="flex w-full justify-end"
					>
						<input
							type="text"
							value={messageToSend}
							onChange={(e) => setMessageToSend(e.target.value)}
							placeholder="Start Typing...."
							className="bg-gray-100 w-full pl-1 focus-visible:outline-0"
						/>
						<button type="submit"
						className="bg-gray-100 p-1">Send</button>
					</form>
					<button
							type="button"
							className="rounded-md bg-red-500 py-2.5 px-3.5 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
							onClick={() => router.push("/")}
						>
							End Session
						</button>	
				</div>
			</div>
		</>
	);
}

export default Chat;
