require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const { Clerk } = require("@clerk/clerk-sdk-node");
const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

export async function authorize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.body.userId;
    const session = await clerk.sessions.verify(req, res);
    const sessionUserId = session.userId;

    if (sessionUserId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong :(" });
  }
}

module.exports.authorize = authorize;
