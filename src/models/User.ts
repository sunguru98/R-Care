import { model, Schema, HookNextFunction } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { TUser, TUserMethod, TUserStatic } from '../types/user.types';
import { JWT_PAYLOAD } from '../types/common.types';
import Route from './Route';

const userSchema = new Schema<TUserMethod>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: String,
  email: { type: String, required: true },
  routes: { type: [Schema.Types.ObjectId], ref: 'route', default: [] }
});

userSchema.methods.toJSON = function(): TUser {
  const user = <TUser>this.toObject();
  delete user.__v;
  delete user.password;
  delete user.accessToken;
  return user;
};

userSchema.methods.getAccessToken = async function(): Promise<string> {
  const user = this;
  const payload = <JWT_PAYLOAD>{ email: user.email, _id: user.id };
  const token = sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: '24h'
  });
  user.accessToken = token;
  await user.save();
  return user.accessToken;
};

userSchema.statics.findByEmailAndPassword = async (
  email: string,
  password: string
): Promise<TUser | null> => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const isMatched = await compare(password, user.password);
    if (!isMatched) throw new Error('Invalid credentials');
    return user;
  } catch (err) {
    return null;
  }
};

userSchema.pre<TUser>('save', async function(
  next: HookNextFunction
): Promise<void> {
  if (this.isModified('password')) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

userSchema.pre<TUser>('remove', async function(next: HookNextFunction) {
  await Route.deleteMany({ user: this.id });
  next()
});

const User = model<TUserMethod, TUserStatic>('user', userSchema);
export default User;
