import { Request, Response, NextFunction } from "express";
import { checkTokenJWT } from "../utils/decrypt";

export async function middlewareCheckTokenJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token is required." });
    }
    const isAuth = await checkTokenJWT(token.split(" ")[1]);
    if (isAuth) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized." });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
}
