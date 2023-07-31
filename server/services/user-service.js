import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { UserDto } from '../dtos/user-dto.js'
import tokenService from './token-service.js'
import { ApiError } from '../exceptions/api-error.js'
import pool from '../db/db.config.js'
const { generateTokens, saveToken, validateAccessToken, validateRefreshToken } =
  tokenService
class UserService {
  async registration(email, password) {
    const candidate = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ])

    if (candidate.rows[0]) {
      throw ApiError.badRequest(
        `Candidate is already exists with the same email ${email}`,
        [
          {
            type: 'field',
            location: 'email',
            msg: 'Candidate is already exists with the same email ${email}',
            path: `${process.env.API_URL}/api/registration`
          }
        ]
      )
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = v4()
    const user = await pool.query(
      'INSERT INTO users(email,hashed_password,activationLink) VALUES($1,$2,$3) RETURNING *',
      [email, hashPassword, activationLink]
    )
    const userDto = new UserDto(user.rows[0]) // id email , isActivated
    const tokens = generateTokens({ ...userDto })
    await saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }
  async login(email, password) {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ])
    if (!user.rows[0]) {
      throw ApiError.badRequest('User with the same email not founded', [
        {
          type: 'field',
          location: 'email',
          msg: 'User with the same email not founded',
          path: `${process.env.API_URL}/api/login`
        }
      ])
    }
    const isPassEquals = await bcrypt.compare(
      password,
      user.rows[0].hashed_password
    )
    if (!isPassEquals) {
      throw ApiError.badRequest('Wrong password', [
        {
          type: 'field',
          location: 'password',
          msg: 'Wrong password',
          path: `${process.env.API_URL}/api/login`
        }
      ])
    }
    const userDto = new UserDto(user.rows[0])
    const tokens = generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError()
    }
    const userData = validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError()
    }
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      userData.id
    ])
    const userDto = new UserDto(user.rows[0])
    const tokens = generateTokens({ ...userDto })
    await saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }
}

export default new UserService()
