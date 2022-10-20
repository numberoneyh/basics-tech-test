import Router from 'express'
import UserController from '../controllers/userController.js'
import { loginValidation, registerValidation } from '../Validation.js'
import { hValidErrors } from '../hValidErrors.js'

const router = new Router()

router.post(
  '/register',
  registerValidation,
  hValidErrors,
  UserController.register
)
router.post('/login', loginValidation, hValidErrors, UserController.login)
router.put('/users', UserController.update)
router.get('/users', UserController.getAll)
router.get('/users/:id', UserController.getOne)

export default router
