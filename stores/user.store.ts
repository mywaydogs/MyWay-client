import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { LoginDto } from "../dto/auth/login.dto";
import { RegisterDto } from "../dto/auth/register.dto";
import { SessionUserDto } from "../dto/auth/session-user.dto";
import AuthService from "../services/auth.service";

export default class UserStore {
  user: SessionUserDto | null;

  constructor(
    private readonly rootStore: RootStore,
    private readonly authService: AuthService
  ) {
    this.user = null;
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
}
