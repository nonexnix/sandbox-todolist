import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Path from "../constants/path";

const useAuth = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const isPathHome = router.pathname === Path.HOME;
    if (!isPathHome && status === "unauthenticated") {
      router.push(Path.HOME);
    }
  }, [session]);

  return {
    session,
    signIn,
    signOut,
  };
};

export default useAuth;
