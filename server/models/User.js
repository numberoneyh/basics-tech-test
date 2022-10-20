import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'


const User = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateBirth: { type: String, required: true },
    gender: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
)

User.plugin(paginate)

export default mongoose.model('User', User)
