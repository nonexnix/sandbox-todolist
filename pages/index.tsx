import { User } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import prismaClient from "../adapters/prisma/prisma-client";
import useAuth from "../hooks/use-auth";

interface Props {
  user: User;
}

const BasePage: NextPage<Props> = ({ user }) => {
  const { session, signOut, signIn } = useAuth();

  return (
    <div>
      <section>
        {!session ? (
          <button onClick={() => signIn("github")}>Sign in</button>
        ) : (
          <div>
            <button onClick={() => signOut()}>Sign out</button>
            <Link href={`/user/${user.id}/home`}>Home</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default BasePage;

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
