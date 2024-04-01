import mongoose, { model } from "mongoose";

export type adminTypes = {
  email: string;
  passwordHash: string;
};
const adminSchema = new mongoose.Schema<adminTypes>(
  {
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
    },
  },
  { timestamps: true }
);

const Admin = model<adminTypes>("admin", adminSchema);

export { Admin };
