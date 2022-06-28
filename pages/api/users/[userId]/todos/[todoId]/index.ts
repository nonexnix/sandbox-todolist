import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../../adapters/prisma";

const handler: NextApiHandler = async (request, response) => {
  const session = await getSession({ req: request });

  if (!session) {
    response.send({ error: "Not logged in" });
  }

  try {
    const todoId = String(request.query.todoId);
    switch (request.method) {
      case "PUT": {
        const body: Prisma.TodoUpdateInput = JSON.parse(request.body);
        const todo = await prisma.todo.update({
          where: { id: todoId },
          data: {
            text: body.text,
            isCompleted: body.isCompleted,
            order: body.order,
          },
        });
        return response.send(todo);
      }
      case "DELETE": {
        const todo = await prisma.todo.delete({
          where: { id: todoId },
        });
        return response.send(todo);
      }
      default: {
        return response.send({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    response.send({ error });
  }
};

export default handler;
