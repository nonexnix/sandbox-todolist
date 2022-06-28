import { User } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

const useUser = () => {
  const router = useRouter();
  const userId = String(router.query.userId);
  const key = `/api/users/${userId}`;
  const { data, mutate } = useSWR(key);
  const user = data as User;

  return {
    user,
    mutate: {
      update: {
        user: async (payload: User) => {
          mutate(payload);
          await fetch(key, {
            method: "PUT",
            headers: {
              contentType: "application/json",
            },
            body: JSON.stringify(payload),
          });
          mutate();
        },
      },
    },
  };
};

export default useUser;
