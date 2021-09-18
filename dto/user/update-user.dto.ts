import { UserDto } from "../auth/user.dto";

export interface UpdateUserDto extends Partial<UserDto> {
  id: number;
  password?: string;
}
