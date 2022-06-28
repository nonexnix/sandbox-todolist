import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Path from "../constants/path";

const useAuth = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const isAtLandingPage = router.pathname === Path.LANDING;
    if (!isAtLandingPage && status === "unauthenticated") {
      router.push(Path.LANDING);
    }
  }, [session]);

  return {
    session,
    signIn,
    signOut,
  };
};

export default useAuth;
