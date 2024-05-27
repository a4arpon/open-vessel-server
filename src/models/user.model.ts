import { Schema, model } from "mongoose"

export type UserType = {
  _id: string
  email: string
  pref: {
    name: string
    phone: string
    bloodGroup: string
  }
  friends: UserType
  bloodDonations: string
  status: string
  sessions: string[]
  createdAt: Date
}

export const Users = model(
  "User",
  new Schema<UserType>(
    {
      email: {
        type: String,
        require: true,
        unique: true,
      },
      pref: {
        name: String,
        phone: String,
        bloodGroup: String,
      },
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      bloodDonations: [
        {
          type: Schema.Types.ObjectId,
          ref: "bloodPost",
        },
      ],
      status: {
        type: String,
        default: "PENDING",
        enum: [
          "ACTIVE",
          "BLOCKED",
          "DELETED",
          "DISABLED",
          "PENDING",
          "REJECTED",
        ],
      },
      sessions: [String],
    },
    {
      timestamps: true,
    }
  )
)
