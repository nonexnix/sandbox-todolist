import cuid from "cuid";

const initial = {
  todo: {
    id: cuid(),
    text: "",
    isCompleted: false,
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "",
  },
};

export default initial;
