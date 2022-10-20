import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as uuid from 'uuid'
import * as path from 'path'

function generateAccessToken(
  id,
  fullName,
  email,
  dateBirth,
  gender,
  password,
  avatar
) {
  const payload = {
    id,
    fullName,
    email,
    dateBirth,
    gender,
    password,
    avatar,
  }
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
}

export class UserController {
  async register(req, res) {
    try {
      const { fullName, email, password, dateBirth, gender } = req.body
      const { avatar } = req.files
      const fileName = uuid.v4() + '.jpg'
      const filePath = path.resolve('static', fileName)
      await avatar.mv(filePath)

      const candidate = await User.findOne({ email: email })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Пользователь с таким именем уже существует' })
      }
      const hashPassword = bcrypt.hashSync(password, 5)
      const user = await User.create({
        fullName,
        email,
        password: hashPassword,
        dateBirth,
        gender,
        avatar: fileName,
      })
      await user.save()
      return res.json({ message: 'The user has been successfully registered' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ message: `Введен неверный пароль или логин` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` })
      }
      const token = generateAccessToken(
        user._id,
        user.fullName,
        user.email,
        user.dateBirth,
        user.gender,
        user.password,
        user.avatar
      )
      return res.json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Login error' })
    }
  }

  async update(req, res) {
    try {
      let { fullName, email, password, dateBirth, gender } = req.body
      const image = req.files

      let updateUser

      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const id = decoded.id

      password = password ? bcrypt.hashSync(password, 5) : decoded.password

      if (image) {
        const fileName = uuid.v4() + '.jpg'
        const filePath = path.resolve('static', fileName)
        await image.avatar.mv(filePath)
        updateUser = await User.findByIdAndUpdate(
          id,
          {
            fullName,
            email,
            password: password,
            dateBirth,
            gender,
            avatar: fileName,
          },
          { new: true }
        )
      }

      if (!image) {
        updateUser = await User.findByIdAndUpdate(
          id,
          {
            fullName,
            email,
            password: password,
            dateBirth,
            gender,
            avatar: decoded.avatar,
          },
          { new: true }
        )
      }
      console.log(image)
      return res.json({...updateUser, message: 'User successfully updated'})
    } catch (e) {
      console.log(e.message)
    }
  }

  async getAll(req, res) {
    try {
      let { page, limit } = req.query
      if (page && limit) {
        page = page || 1
        limit = limit || 6
        const users = await User.paginate({}, { page, limit })
        return res.json(users)
      }

      if (!page && limit) {
        page = page || 1
        limit = limit || 6
        const users = await User.paginate({}, { page, limit })
        return res.json(users)
      }

      if (page && !limit) {
        page = page || 1
        limit = limit || 6
        const users = await User.paginate({}, { page, limit })
        return res.json(users)
      }

      const users = await User.find()
      return res.json(users)
    } catch (e) {
      console.log(e)
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: 'id не указан' })
      }
      const user = await User.findById(id)
      return res.json(user)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new UserController()

