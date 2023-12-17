import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum UserRole {
  admin = 'admin',
  simpleUser = 'simpleUser',
  worker = 'worker',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email существует'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  banned: boolean;

  @Prop({ default: UserRole.simpleUser })
  userRole: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
