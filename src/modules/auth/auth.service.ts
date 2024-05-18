import {response} from "@/utils/req-res-helpers"
import {Injectable} from "@nestjs/common"

@Injectable()
export class AuthService {
  async login() {
    return response("")
  }
}
