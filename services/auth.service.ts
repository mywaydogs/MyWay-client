import { LoginDto } from "../dto/auth/login.dto";
import { RegisterDto } from "../dto/auth/register.dto";
import { UserDto } from "../dto/auth/user.dto";
import { UpdateUserDto } from "../dto/user/update-user.dto";
import BaseHttpService from "./base-http.service";

export default class AuthService extends BaseHttpService {
  async login(loginDto: LoginDto): Promise<UserDto> {
    return (await this.post<UserDto>("/api/auth/login", loginDto)) as UserDto;
  }

  async register(registerDto: RegisterDto): Promise<void> {
    return await this.post("/api/auth/register", registerDto);
  }

  async getUserProfile(): Promise<UserDto> {
    return (await this.get<UserDto>("/api/users/profile")) as UserDto;
  }

  async update(updateUserDto: UpdateUserDto): Promise<void> {
    const { id, ...rest } = updateUserDto;
    return await this.patch(`/api/users/${updateUserDto.id}`, rest);
  }
}
