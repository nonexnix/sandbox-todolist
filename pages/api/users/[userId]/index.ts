import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../adapters/prisma";

const handler: NextApiHandler = async (request, response) => {
  const session = await getSession({ req: request });

  if (!session) {
    response.send({ error: "Not logged in" });
  }

  try {
    const userId = String(request.query.userId);
    switch (request.method) {
      case "GET": {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        return response.send(user);
      }
      case "PUT": {
        const body: Prisma.UserUpdateInput = JSON.parse(request.body);
        const user = await prisma.user.update({
          where: { id: userId },
          data: {
            firstName: body.firstName,
            lastName: body.lastName,
          },
        });
        return response.send(user);
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
