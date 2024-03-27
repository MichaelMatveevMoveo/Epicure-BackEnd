import { Request, Response } from "express";
import { addUser, login } from "../../../handlers/apiHandlers/v1/usersHandler";

export async function addUserController(req: Request, res: Response) {
  try {
    res.send(
      await addUser(
        req.body.name,
        req.body.username,
        req.body.password,
        req.body.mail,
        req.body.role
      )
    );
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const ans = await login(req.body.username, req.body.password);
    if (ans) {
      res.cookie("token", ans, { maxAge: 900000 });
      res.send("connected");
    } else {
      res.status(401).send("bad password");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
