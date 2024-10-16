import { IsString, IsEmail } from 'class-validator';

export class UserLoginDTO {
	@IsEmail({}, { message: 'Неверный email' })
	email: string;

	@IsString({ message: 'Неверный пароль' })
	password: string;
}
