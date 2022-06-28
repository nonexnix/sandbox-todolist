import { User } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import prisma from "../adapters/prisma";
import useAuth from "../hooks/use-auth";

interface Props {
  user: User;
}

const BasePage: NextPage<Props> = ({ user }) => {
  const { session, signOut, signIn } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 [&>main]:flex-1 [&>*>div]:mx-auto [&>*>div]:max-w-7xl [&>*]:px-4">
      <header>
        <div>
          <nav className="flex items-center justify-end gap-4 py-4 text-right">
            {session && (
              <div className="flex items-center gap-4 truncate">
                <span>{user.email}</span>
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={user.image!}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              </div>
            )}
            {!session ? (
              <button
                className="rounded-full bg-slate-900 px-5 py-2 text-slate-200"
                onClick={() => signIn("github")}>
                Login
              </button>
            ) : (
              <button
                className="rounded-full bg-slate-900 px-5 py-2 text-slate-200"
                onClick={() => signOut()}>
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
      <main>
        <div>
          <section className="space-y-4 py-44 text-center">
            <h1 className="text-5xl font-bold">WELCOME TO</h1>
            <h2 className="text-3xl font-bold">Sandbox Todolist</h2>
            {session && (
              <div className="py-8">
                <Link href={`/user/${user.id}/home`}>
                  <a className="text-lg font-semibold text-blue-500">
                    Go To Home
                  </a>
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default BasePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) return { props: { session } };

  const userEmail = String(session.user!.email);

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  return {
    props: {
      session,
      user,
    },
  };
};
