import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import {
  Schema,
  models,
  model
} from "mongoose"

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (pass) {
        if (!pass.length || pass.length < 5) {
          console.log("schema validation executed");
          throw new Error("Password should be at least 5 characters");
        }
        return true;
      },
    },
  }
}, {
  timestamps: true
});

//hooks

UserSchema.post('validate', function (docs, next) {
  // we can directly change the database after saving and modify as well
  const notHashedpassword = docs.password;
  const salt = bcrypt.genSaltSync(10)
  docs.password = bcrypt.hashSync(notHashedpassword, salt)
  next()

})


export const User = models.User || model("User", UserSchema)