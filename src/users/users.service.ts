import { IUserService } from './users.service.interface';
import { UserRegisterDTO } from './dto/user-register.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { User } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
	async createUser({ name, email, password }: UserRegisterDTO): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);

		return null;
	}

	async validateUser({ password, email }: UserLoginDTO): Promise<boolean> {
		return true;
	}
}
