import { ApiError } from '../exceptions/api-error.js'
import tokenService from '../services/token-service.js'
import jwt from 'jsonwebtoken'
export const authMiddleware = async function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.unauthorizedError())
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.unauthorizedError())
    }
    const userId = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    if (
      userId.id !=
      (req.body.user_id ||
        req.body.userId ||
        req.params.user_id ||
        req.query.user_id)
    ) {
      return next(ApiError.unauthorizedError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.unauthorizedError())
    }
    req.user = userData
    next()
  } catch (e) {
    return next(ApiError.unauthorizedError())
  }
}
