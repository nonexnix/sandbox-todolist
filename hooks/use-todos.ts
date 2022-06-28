import { Todo } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

const useTodos = () => {
  const router = useRouter();
  const userId = String(router.query.userId);
  const key = `/api/users/${userId}/todos`;
  const { data, mutate } = useSWR(key);
  const todos = data as Todo[];

  return {
    todos,
    mutate: {
      create: {
        todo: async (payload: Todo) => {
          mutate([...todos, payload]);
          await fetch(key, {
            method: "POST",
            headers: {
              contentType: "application/json",
            },
            body: JSON.stringify(payload),
          });
          mutate();
        },
        update: {
          todo: async (payload: Todo) => {
            mutate(
              todos.map((todo) => {
                if (todo.id !== payload.id) return todo;
                return payload;
              })
            );
            await fetch(`${key}/${payload.id}`, {
              method: "PUT",
              headers: {
                contentType: "application/json",
              },
              body: JSON.stringify(payload),
            });
            mutate();
          },
        },
        delete: {
          todo: async (payload: Todo) => {
            mutate(todos.filter((todo) => todo.id === payload.id));
            await fetch(`${key}/${payload.id}`, {
              method: "DELETE",
              headers: {
                contentType: "application/json",
              },
            });
            mutate();
          },
        },
      },
    },
  };
};

export default useTodos;
