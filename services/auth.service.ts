import { LoginDto } from "../dto/auth/login.dto";
import { RegisterDto } from "../dto/auth/register.dto";
import { SessionUserDto } from "../dto/auth/session-user.dto";
import BaseHttpService from "./base-http.service";

export default class AuthService extends BaseHttpService {
  async login(loginDto: LoginDto): Promise<SessionUserDto> {
    return (await this.post<SessionUserDto>(
      "/api/auth/login",
      loginDto
    )) as SessionUserDto;
  }

  async register(registerDto: RegisterDto): Promise<void> {
    return await this.post("/api/auth/register", registerDto);
  }
}
