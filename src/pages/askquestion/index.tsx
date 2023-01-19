import { type FC, type FormEvent, useState } from "react";
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
import { useRouter } from "next/router";
import { useUser } from "../UserContext";
import { api } from "../../utils/api";

export default function AskQuestion() {
	const [question, setQuesiton] = useState<string>("");
	const [code, setCode] = useState<string>(
		`function add(a, b) {\n  return a + b;\n}`
	);
	const [language, setLanguage] = useState<string>("javascript");
	const [difficulty, setDifficulty] = useState<number>(0);
	const [nickname, setNickname] = useState<string>("");

	const { setUser } = useUser();
	const newStudentMutation = api.user.createStudent.useMutation()
	const router = useRouter();

	function getLanguage() {
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

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(question, code, language, difficulty);
		setUser({ nickname, question, language, code });
		const { questionID } = await newStudentMutation.mutateAsync({
			nickname,
			question: { question, skill: language, difficulty }
		});
		return router.push(`/chat/${questionID}`);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#7031c9] to-[#151fd5]">
			<div className="flex flex-col items-center">
				<h1 className="my-6 text-xl font-bold text-white">
					Submit a quesiton
				</h1>
				<form
					className="flex w-[40%] flex-col gap-4"
					onSubmit={handleSubmit}
				>
					<label className="text-lg text-white" htmlFor="question">
						Question
					</label>
					<textarea
						className="h-12"
						name="question"
						id="question"
						value={question}
						onChange={(e) => setQuesiton(e.target.value)}
					/>
					<label className="text-lg text-white" htmlFor="language">
						Language
					</label>
					<select
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
					>
						<option value="javascript">Javascript</option>
						<option value="typescript">Typescript</option>
						<option value="python">Python</option>
						<option value="java">Java</option>
						<option value="c++">C++</option>
					</select>
					<label className="text-lg text-white" htmlFor="code">
						Code
					</label>
					<Editor
						value={code}
						onValueChange={(code) => setCode(code)}
						highlight={(code) => highlight(code, getLanguage())}
						ignoreTabKey={false}
						padding={10}
						style={{
							fontFamily: '"Fira code", "Fira Mono", monospace',
							fontSize: 14,
							backgroundColor: "white",
							height: "30rem"
						}}
					/>
					<div className="flex flex-col items-center gap-2 pb-3">
						<label
							className="text-lg text-white"
							htmlFor="difficulty"
						>
							Difficulty
						</label>
						<div className="flex items-center gap-3">
							<button
								type="button"
								className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
									difficulty === 1
										? "bg-indigo-900 hover:bg-indigo-900"
										: ""
								}`}
								onClick={() => setDifficulty(1)}
							>
								1
							</button>
							<button
								type="button"
								className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
									difficulty === 2
										? "bg-indigo-900 hover:bg-indigo-900"
										: ""
								}`}
								onClick={() => setDifficulty(2)}
							>
								2
							</button>
							<button
								type="button"
								className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
									difficulty === 3
										? "bg-indigo-900 hover:bg-indigo-900"
										: ""
								}`}
								onClick={() => setDifficulty(3)}
							>
								3
							</button>
							<button
								type="button"
								className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
									difficulty === 4
										? "bg-indigo-900 hover:bg-indigo-900"
										: ""
								}`}
								onClick={() => setDifficulty(4)}
							>
								4
							</button>
							<button
								type="button"
								className={`inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
									difficulty === 5
										? "bg-indigo-900 hover:bg-indigo-900"
										: ""
								}`}
								onClick={() => setDifficulty(5)}
							>
								5
							</button>
						</div>
					</div>
					<label className="text-lg text-white" htmlFor="nickname">
						Nickname
					</label>
					<input
						type="text"
						name="nickname"
						id="nickname"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
					/>
					<button
						type="submit"
						className="mb-12 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
