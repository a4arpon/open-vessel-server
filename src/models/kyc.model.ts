import { Schema, model } from "mongoose"

const kycSchema = new Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    require: true,
  },
})

const KYCModel = model("KYC", kycSchema)

export default KYCModel
