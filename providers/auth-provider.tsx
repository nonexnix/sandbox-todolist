import { useRouter } from "next/router";
import React from "react";
import Route from "../constants/route";
import useAuth from "../hooks/use-auth";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  // If the session is not available and the user is not logged in, then redirect
  const { session, status } = useAuth();
  const router = useRouter();

  console.log(`AuthProvider: ${status} | ${router.pathname}`);

  // If the session is not available and the user is logged in, then show loader and render
  // Or  when the user tries to access restricted url and not logged in, then show loader and redirect
  if (!session && router.pathname !== Route.BASE) return <>Loading...</>;

  // If the session is available and the user is logged in then render
  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProvider;
