import { response } from "@/utils/req-res-helpers"
import { Controller, Get } from "@nestjs/common"

@Controller()
export class AppController {
  @Get()
  async app() {
    return response("Hello this is our api")
  }
}
