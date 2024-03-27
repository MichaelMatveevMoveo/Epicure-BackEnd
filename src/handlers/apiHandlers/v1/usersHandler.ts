import mongoose from "mongoose";
import User from "../../../mongoDB/models/user";
import { createTokenJWT, decryptDataForge } from "../../../utils/decrypt";

export async function addUser(
  name: string,
  username: string,
  password: string,
  mail: string,
  role: string
) {
  const user = new User({
    name: name,
    username: username,
    password: password,
    mail: mail,
    role: role,
  });
  return await user.save();
}

export async function login(username: string, password: string) {
  const user = await User.findOne({ username: username });
  const decryptPassword = decryptDataForge(password);
  if (user) {
    const ans = await user.isValidPassword(decryptPassword);
    if (ans) {
      const token = createTokenJWT({
        name: user.name,
        mail: user.mail,
        role: user.role,
      });
      return token;
    }
    return false;
  }
  return false;
}
