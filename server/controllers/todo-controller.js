import pool from '../db/db.config.js'
import { ApiError } from '../exceptions/api-error.js'
class TodoController {
  //get all todos
  async getTodos(req, res, next) {
    const { user_id } = req.params
    try {
      const users = await pool.query('SELECT user_id FROM users')
      const user = users.rows.find(item => item.user_id == user_id)
      if (!user) {
        throw ApiError.badRequest('Not valid request', [
          {
            type: 'field',
            location: 'params - user_id',
            msg: 'user_id is not valid',
            path: `${process.env.API_URL}/api/todos/{user_id}`
          }
        ])
      }
      const todos = await pool.query('SELECT * FROM todos WHERE user_id = $1', [
        user_id
      ])
      res.json(todos.rows)
    } catch (err) {
      next(err)
    }
  }
  //add new todo
  async AddTodo(req, res, next) {
    const { user_id, title } = req.body
    try {
      const users = await pool.query('SELECT user_id FROM users')
      const user = users.rows.find(item => item.user_id == user_id)
      if (!user) {
        throw ApiError.badRequest('Not valid request', [
          {
            type: 'field',
            location: 'user_id',
            msg: 'user_id is not valid',
            path: `${process.env.API_URL}/api/todos/`
          }
        ])
      }
      const newTodo = await pool.query(
        'INSERT INTO todos(user_id,title,completed) VALUES($1,$2,$3) RETURNING *',
        [user_id, title, false]
      )
      if (!newTodo.rows[0]) {
        throw ApiError.badRequest('Not valid request', [
          {
            type: 'field',
            location: 'params - user_id',
            msg: 'user_id is not valid',
            path: `${process.env.API_URL}/api/todos/{user_id}`
          }
        ])
      }
      res.status(201).json(newTodo.rows[0])
    } catch (err) {
      next(err)
    }
  }
  async removeTodo(req, res, next) {
    const { todo_id } = req.params
    const id = todo_id
    const { user_id } = req.query
    try {
      const users = await pool.query('SELECT user_id FROM users')
      const user = users.rows.find(item => item.user_id == user_id)
      if (!user) {
        throw ApiError.badRequest('Not valid request', [
          {
            type: 'field',
            location: 'user_id',
            msg: 'user_id is not valid',
            path: `${process.env.API_URL}/api/todos/`
          }
        ])
      }
      const deleteTodo = await pool.query(
        'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *',
        [id, user_id]
      )
      if (!deleteTodo.rows[0]) {
        throw ApiError.badRequest('Not valid request', [
          {
            type: 'field',
            location: 'params - todo_id',
            msg: 'todo_id is not valid',
            path: `${process.env.API_URL}/api/todos/{todo_id}?user_id=`
          }
        ])
      }
      res.json(deleteTodo.rows[0])
    } catch (err) {
      next(err)
    }
  }
  async changeTodo(req, res, next) {
    const { id } = req.params
    const { title, completed, user_id } = req.body
    try {
      const users = await pool.query('SELECT user_id FROM users')
      const user = users.rows.find(item => item.user_id == user_id)
      if (!user) {
        throw ApiError.badRequest('Not valid request', [
          {
            type: 'field',
            location: 'user_id',
            msg: 'user_id is not valid',
            path: `${process.env.API_URL}/api/todos/{todo_id}`
          }
        ])
      }
      const editTodo = await pool.query(
        'UPDATE todos SET title = $1,completed = $2 WHERE todo_id = $3 AND user_id = $4 RETURNING *',
        [title, completed, id, user_id]
      )
      if (!editTodo.rows[0]) {
        throw ApiError.badRequest('Not valid request', [
          {
            type: 'field',
            location: 'params - todo_id',
            msg: 'todo_id is not valid',
            path: `${process.env.API_URL}/api/todos/{todo_id}`
          }
        ])
      }
      res.json(editTodo.rows[0])
    } catch (err) {
      next(err)
    }
  }
}

export default new TodoController()
