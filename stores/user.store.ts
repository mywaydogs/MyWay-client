import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { APIErrorResponse } from "../dto/api/api-error-response";
import { LoginDto } from "../dto/auth/login.dto";
import { RegisterDto } from "../dto/auth/register.dto";
import { UserDto } from "../dto/auth/user.dto";
import { UpdateUserDto } from "../dto/user/update-user.dto";
import AuthService from "../services/auth.service";

export default class UserStore {
  user: UserDto | null = null;

  constructor(
    private readonly rootStore: RootStore,
    private readonly authService: AuthService
  ) {
    this.getUserProfile()
      .then((user: UserDto) => {
        this.setUser(user);
      })
      .catch((e: APIErrorResponse) => {
        console.log(e);
      });

    makeAutoObservable(this);
  }

  setUser(user: UserDto | null) {
    this.user = user;
  }

  async login(loginDto: LoginDto): Promise<void> {
    this.setUser(await this.authService.login(loginDto));
  }

  async register(registerDto: RegisterDto): Promise<void> {
    await this.authService.register(registerDto);
    const { email, password } = registerDto;
    const loginDto: LoginDto = { email, password };
    this.setUser(await this.authService.login(loginDto));
  }

  async logout(): Promise<void> {
    this.setUser(null);
    await this.authService.logout();
  }

  async getUserProfile(): Promise<UserDto> {
    return await this.authService.getUserProfile();
  }

  async update(updateUserDto: UpdateUserDto): Promise<void> {
    await this.authService.update(updateUserDto);
    this.setUser(Object.assign({}, this.user, updateUserDto));
  }
}
