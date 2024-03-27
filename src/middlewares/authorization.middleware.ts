import { Request, Response, NextFunction } from "express";
import { checkTokenJWT } from "../utils/decrypt";

function isTokenNeeded(req: Request) {
  return req.url.startsWith("/api/v1/users/login") || req.method === "GET";
}
export async function middlewareCheckTokenJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (isTokenNeeded(req)) {
      return next();
    }
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
