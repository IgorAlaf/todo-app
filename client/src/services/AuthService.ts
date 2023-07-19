import $api from '../http'
import { AuthResponse } from '../models/response/AuthResponse'
import { AxiosResponse } from 'axios'
export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const response = await $api.post<AuthResponse>('/login', {
      email,
      password
    })
    localStorage.setItem('user_id', response.data.user.id)
    return response
  }
  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const response = await $api.post<AuthResponse>('/registration', {
      email,
      password
    })
    localStorage.setItem('user_id', response.data.user.id)
    return response
  }
  static async logout(): Promise<void> {
    return $api.get('/logout')
  }
}
