import { type FC, useState, type FormEvent, useRef } from "react";
import Skill from "./Skill";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { useUser } from "../UserContext";

export default function AskQuestion() {
	const [javascriptDifficulty, setJavascriptDifficulty] = useState<number>(0);
	const [typescriptDifficulty, setTypescriptDifficulty] = useState<number>(0);
	const [reactDifficulty, setReactDifficulty] = useState<number>(0);
	const [pythonDifficulty, setPythonDifficulty] = useState<number>(0);
	const [javaDifficulty, setJavaDifficulty] = useState<number>(0);
	const [cppDifficulty, setCppDifficulty] = useState<number>(0);
	const [nickname, setNickname] = useState<string>("");
	const [searching, setSearching] = useState<boolean>(false);
	const { user, setUser } = useUser();
	const router = useRouter();

	type UserType = {
		question: string;
		language: string;
		code: string;
	};

	const deleteQuestion = api.user.deleteQuestion.useMutation();
	const { data } = api.user.fetchQuestions.useQuery(undefined, {
		enabled: searching,
		refetchInterval: 2000,
		onSuccess: (questions) => {
			if (!questions) return;
			console.log("question not undefined");
			for (const question of questions) {
				console.log(question, javascriptDifficulty);
				if (
					question.skill === "javascript" &&
					question.difficulty <= javascriptDifficulty
				) {
					setSearching(false);
					console.log(question);
					setContextProps({
						question: question.question,
						language: question.skill,
						code: question.code
					});
					deleteQuestion.mutate({ id: question.id });
					router.push(`/chat/${question.id}?nickname=${nickname}`);
				}
				if (
					question.skill === "typescript" &&
					question.difficulty <= typescriptDifficulty
				) {
					setSearching(false);
					setContextProps({
						question: question.question,
						language: question.skill,
						code: question.code
					});
					deleteQuestion.mutate({ id: question.id });
					router.push(`/chat/${question.id}?nickname=${nickname}`);
				}
				if (
					question.skill === "react" &&
					question.difficulty <= reactDifficulty
				) {
					setSearching(false);
					deleteQuestion.mutate({ id: question.id });
					router.push(`/chat/${question.id}?nickname=${nickname}`);
				}
				if (
					question.skill === "python" &&
					question.difficulty <= pythonDifficulty
				) {
					setSearching(false);
					deleteQuestion.mutate({ id: question.id });
					router.push(`/chat/${question.id}?nickname=${nickname}`);
				}
				if (
					question.skill === "java" &&
					question.difficulty <= javaDifficulty
				) {
					setSearching(false);
					deleteQuestion.mutate({ id: question.id });
					router.push(`/chat/${question.id}?nickname=${nickname}`);
				}
				if (
					question.skill === "cpp" &&
					question.difficulty <= cppDifficulty
				) {
					setSearching(false);
					deleteQuestion.mutate({ id: question.id });
					router.push(`/chat/${question.id}?nickname=${nickname}`);
				}
			}
		}
	});

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSearching(true);
		console.log("submitting");
	}

	function setContextProps(userData: UserType) {
		setUser({
			...user,
			nickname,
			question: userData.question,
			language: userData.language,
			code: userData.code
		});
	}

	return (
		<>
			{!searching && (
				<div className="min-h-screen bg-gradient-to-b from-[#7031c9] to-[#151fd5]">
					<div className="flex flex-col items-center">
						<h1 className="mt-12 mb-6 text-center text-xl font-bold text-white">
							Rate your strength in the below areas on a scale of
							1 to 5, with 5 being the strongest <br /> Rate a
							skill as 0 if you&apos;d prefer not to answer
							questions on the given subject
						</h1>
						<form
							className="flex w-[40%] flex-col gap-4"
							onSubmit={(e) => handleSubmit(e)}
						>
							<Skill
								name="Javascript"
								difficulty={javascriptDifficulty}
								setDifficulty={setJavascriptDifficulty}
							/>
							<Skill
								name="Typescript"
								difficulty={typescriptDifficulty}
								setDifficulty={setTypescriptDifficulty}
							/>
							<Skill
								name="React"
								difficulty={reactDifficulty}
								setDifficulty={setReactDifficulty}
							/>
							<Skill
								name="Python"
								difficulty={pythonDifficulty}
								setDifficulty={setPythonDifficulty}
							/>
							<Skill
								name="Java"
								difficulty={javaDifficulty}
								setDifficulty={setJavaDifficulty}
							/>
							<Skill
								name="C++"
								difficulty={cppDifficulty}
								setDifficulty={setCppDifficulty}
							/>
							<input
								type="text"
								name="nickname"
								id="nickname"
								placeholder="Nickname"
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
								className="pl-2"
							/>
							<button
								type="submit"
								className="mt-2 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
			{searching && (
				<div className="min-h-screen bg-gradient-to-b from-[#7031c9] to-[#151fd5]">
					<div className="flex flex-col items-center">
						<h1 className="mt-12 mb-6 text-center text-xl font-bold text-white">
							Searching for a question...
						</h1>
						<svg
							className="mr-3 h-5 w-5 animate-spin text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8v8H4z"
							></path>
						</svg>
					</div>
				</div>
			)}
		</>
	);
}
