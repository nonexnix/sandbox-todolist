import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismaClient from "../../../../adapters/prisma/prisma-client";

type Handler = (request: NextApiRequest, response: NextApiResponse) => {};

const handler: Handler = async (request, response) => {
  const session = await getSession({ req: request });

  if (!session) {
    response.send({ error: "Not logged in" });
  }

  try {
    switch (request.method) {
      case "GET": {
        const userId = String(request.query.userId);
        const user = await prismaClient.user.findUnique({
          where: { id: userId },
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
