import { UserRegisterDTO } from './dto/user-register.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserModel } from '@prisma/client';

export interface IUserService {
	createUser: (dto: UserRegisterDTO) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDTO) => Promise<boolean>;
}
