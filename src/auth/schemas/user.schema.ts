import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export enum UserRole {
  admin = 'admin',
  simpleUser = 'simpleUser',
  worker = 'worker',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email существует'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  banned: boolean;

  @Prop({ default: UserRole.simpleUser })
  userRole: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
