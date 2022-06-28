import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../adapters/prisma";

const handler: NextApiHandler = async (request, response) => {
  const session = await getSession({ req: request });

  if (!session) {
    response.send({ error: "Not logged in" });
  }

  try {
    const userId = String(request.query.userId);
    switch (request.method) {
      case "GET": {
        const todos = await prisma.todo.findMany({
          where: { userId },
        });
        return response.send(todos);
      }
      case "POST": {
        const body: Prisma.TodoCreateInput = JSON.parse(request.body);
        const todo = await prisma.todo.create({
          data: {
            text: body.text,
            isCompleted: body.isCompleted,
            order: body.order,
            userId,
          },
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
