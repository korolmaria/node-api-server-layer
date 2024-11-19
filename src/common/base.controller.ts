import { Router, Response } from 'express';
import { ExpressReturnType, IRouteController } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class BaseController {
	private readonly _router: Router;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send(res, 200, message);
	}

	public created(res: Response): void {
		res.sendStatus(201);
	}

	protected bindRoutes(routes: IRouteController[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] - ${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
