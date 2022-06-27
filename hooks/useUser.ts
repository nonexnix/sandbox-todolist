import { User } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

const useUser = () => {
  const router = useRouter();
  const userId = String(router.query.userId);
  const key = `/api/users/${userId}`;
  const { data, mutate } = useSWR<User>(key);
  const user = data as User;

  return {
    user,
    mutate,
  };
};

export default useUser;
