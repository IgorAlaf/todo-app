import { Router } from 'express'
import userContoller from '../controllers/user-contoller.js'
import { body } from 'express-validator'
import { authMiddleware } from '../middlewares/auth-middleware.js'
import todoController from '../controllers/todo-controller.js'
const router = new Router()
const { registration, login, logout, refresh } = userContoller

//? authorization
router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  registration
)
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  login
)
router.get('/logout', authMiddleware, logout)
router.get('/refresh', refresh)

router.get('/todos/:user_id', authMiddleware, todoController.getTodos)
router.post('/todos', authMiddleware, todoController.AddTodo)
router.put('/todos/:id', authMiddleware, todoController.changeTodo)
router.delete('/todos/:todo_id', authMiddleware, todoController.removeTodo)

export default router
