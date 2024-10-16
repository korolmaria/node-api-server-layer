import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import 'reflect-metadata';
import { TYPES } from '../types';
import { inject } from 'inversify';
import { IUserController } from './users.controller.interface';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { UserService } from './users.service';
import { ValidateMiddleware } from '../common/validate.middleware';

export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDTO)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDTO)],
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDTO>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'ошибка авторизации', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);

		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}

		this.ok(res, result);
	}
}
