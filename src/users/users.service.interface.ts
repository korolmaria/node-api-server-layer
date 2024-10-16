import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDTO } from './dto/user-login.dto';

export interface IUserService {
	createUser: (dto: UserRegisterDTO) => Promise<User | null>;
	validateUser: (dto: UserLoginDTO) => Promise<boolean>;
}
