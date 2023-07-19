export class UserDto {
  email
  id
  constructor(model) {
    this.id = model.user_id
    this.email = model.email
  }
}
