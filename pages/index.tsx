import { User } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import prismaClient from "../adapters/prisma/prisma-client";
import useAuth from "../hooks/useAuth";

interface Props {
  user: User;
}

const LandingPage: NextPage<Props> = ({ user }) => {
  const { session, signOut, signIn } = useAuth();

  return (
    <div>
      <section>
        {session ? (
          <div>
            <button onClick={() => signOut()}>Sign out</button>
            <Link href={`/user/${user.id}`}>Home</Link>
          </div>
        ) : (
          <button onClick={() => signIn("github")}>Sign in</button>
        )}
      </section>
    </div>
  );
};

export default LandingPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) return { props: { session } };

  const userEmail = String(session.user!.email);

  const user = await prismaClient.user.findUnique({
    where: { email: userEmail },
  });

  return {
    props: {
      session,
      user,
    },
  };
};
