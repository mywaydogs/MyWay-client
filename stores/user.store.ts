import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { LoginDto } from "../dto/auth/login.dto";
import { RegisterDto } from "../dto/auth/register.dto";
import { UserDto } from "../dto/auth/user.dto";
import { UpdateUserDto } from "../dto/user/update-user.dto";
import AuthService from "../services/auth.service";

export default class UserStore {
  user: UserDto | null;

  constructor(
    private readonly rootStore: RootStore,
    private readonly authService: AuthService
  ) {
    this.user = null;

    this.getUserProfile().then((user: UserDto) => {
      this.user = user;
    });

    makeAutoObservable(this);
  }

  async login(loginDto: LoginDto): Promise<void> {
    this.user = await this.authService.login(loginDto);
  }

  async register(registerDto: RegisterDto): Promise<void> {
    await this.authService.register(registerDto);
    const { email, password } = registerDto;
    const loginDto: LoginDto = { email, password };
    this.user = await this.authService.login(loginDto);
  }

  async logout(): Promise<void> {
    this.user = null;
    await this.authService.logout();
  }

  async getUserProfile(): Promise<UserDto> {
    return await this.authService.getUserProfile();
  }

  async update(updateUserDto: UpdateUserDto): Promise<void> {
    await this.authService.update(updateUserDto);
    Object.assign(this.user, updateUserDto);
  }
}
