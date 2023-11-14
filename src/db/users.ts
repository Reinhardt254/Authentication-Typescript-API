import mongoose, { model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
   username: {type: String, required: true},
   email: {type: String, required: true},
   authentication: {
      password: {type: String, required: true, select: false},
      salt: {type: String, select: false},
      sessionToken: {type: String, select: false},
   }
});

const user = models.User || model("User", UserSchema)

export const UserModel = user;

export const getUsers = () => UserModel.find();
export const getUserEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
   "authentication.sessionToken": sessionToken,
})
export const getUserById = (id: string) => UserModel.findById(id)
