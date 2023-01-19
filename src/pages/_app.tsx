import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import UserContextProvider from "./UserContext";

import { useState, type FormEvent } from "react";

import { useRouter } from "next/router";

import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [sender, setSender] = useState("");
  const router = useRouter();


  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push("/chat");
  };

  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <Component 
        sender={sender}
        handleLogin={handleLogin}
        {...pageProps} />
      </UserContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
