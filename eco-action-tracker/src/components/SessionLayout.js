// src/components/SessionLayout.js
"use client"; 
import { SessionProvider } from "next-auth/react";

const SessionLayout = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default SessionLayout;
