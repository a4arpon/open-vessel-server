import { Schema, model } from "mongoose"

const userSchema = new Schema({
  kyc: {
    type: Schema.Types.ObjectId,
    ref: "KYC",
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  pref: {
    name: String,
    phone: String,
    bloodGroup: String,
    bloodDonations: [
      {
        type: Schema.Types.ObjectId,
        ref: "bloodPost",
      },
    ],
  },
  status: {
    type: String,
    default: "PENDING",
    enum: ["ACTIVE", "BLOCKED", "DELETED", "DISABLED", "PENDING", "REJECTED"],
  },
  sessions: [String],
})

const UserModel = model("User", userSchema)

export default UserModel
