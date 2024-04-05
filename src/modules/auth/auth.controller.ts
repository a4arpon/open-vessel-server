import { Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"

@Controller({
  path: "auth",
  version: ["1"],
})
export class AuthController {
  private readonly authServices: AuthService

  constructor() {
    this.authServices = new AuthService()
  }

  @Post("login")
  async login() {
    return this.authServices.login()
  }
}
