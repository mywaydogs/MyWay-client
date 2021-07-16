import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  token: string;

  @Column()
  expiresIn: Date;

  @Column()
  userId: number;

  @ManyToOne((type) => User)
  user?: User;
}
