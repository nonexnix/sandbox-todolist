import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Route from "../constants/route";

const useAuth = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const isAtBaseUrl = router.pathname === Route.BASE;
    if (!isAtBaseUrl && status === "unauthenticated") {
      router.push(Route.BASE);
    }
  }, [session]);

  return {
    session,
    status,
    signIn,
    signOut,
  };
};

export default useAuth;
