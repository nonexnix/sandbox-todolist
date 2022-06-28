import { Todo } from "@prisma/client";
import create from "zustand";
import cuid from "cuid";
import initial from "./initial";

interface UseFieldsStore {
  todo: {
    fields: Todo;
    setFields: (payload: Todo) => void;
  };
}

const UseFieldsStore = create<UseFieldsStore>((set) => ({
  todo: {
    fields: initial.todo,
    setFields: (payload) => set(({ todo }) => ({ todo: { ...todo, payload } })),
    resetFields: () => set(({ todo }) => ({ todo: { ...todo, id: cuid() } })),
  },
}));
