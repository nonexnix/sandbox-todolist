import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Path from "../constants/path";

const useAuth = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const isAtBaseUrl = router.pathname === Path.BASE;
    if (!isAtBaseUrl && status === "unauthenticated") {
      router.push(Path.BASE);
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
