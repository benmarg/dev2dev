"use client";

import { useEffect, useRef, useState } from "react";
import superjson from "superjson";

const useSessionStorage = <S>(key: string, initalState: S | (() => S)) => {
	const isNew = useRef(true);
	const [state, setState] = useState<S>(initalState);

	useEffect(() => {
		if (isNew.current) {
			const sessionState = sessionStorage.getItem(key);
			if (sessionState !== null) {
				setState(superjson.parse<S>(sessionState));
			}

			isNew.current = false;
			return;
		}

		sessionStorage.setItem(key, superjson.stringify(state));
	}, [key, state]);

	return [state, setState] as const;
};
export default useSessionStorage;
