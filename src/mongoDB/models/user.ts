import mongoose, { Model } from "mongoose";
import { hash } from "bcrypt";
import { compare } from "bcrypt";

interface IUser {
  name: string;
  username: string;
  password: string;
  mail: string;
  role: string;
}

interface UserMethods {
  isValidPassword: (password: string) => Promise<boolean>;
}
type UserModel = Model<IUser, {}, UserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, UserMethods>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;

  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  const isValid = await compare(password, this.password);
  return isValid;
};

const User = mongoose.model("User", userSchema);

export default User;
