import type { Dispatch, SetStateAction } from "react";
import { type FC, createContext, useContext, useState } from "react";
import useSessionStorage from "./chat/useSessionStorage";

type User = {
	nickname: string;
	question: string;
	language: string;
	code: string;
};

type UserContextType = {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
	const stuff = useContext(UserContext);
	if (stuff === null) throw new Error("UserContext is null");
	return stuff;
}

interface UserContextProps {
	children: React.ReactNode;
}

const UserContextProvider: FC<UserContextProps> = ({ children }) => {
	const [user, setUser] = useSessionStorage("user", {
		nickname: "Anonymous",
		question: "",
		language: "",
		code: ""
	});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
