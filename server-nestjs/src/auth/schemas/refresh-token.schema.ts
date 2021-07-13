import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: User;

  @Prop()
  token: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
