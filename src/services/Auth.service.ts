/* eslint-disable class-methods-use-this,@typescript-eslint/no-unused-vars */
import IUser from '../interfaces/user.interface';
import Database from '../interfaces/database.interface';
import database from '../database/database_1615571003434.json';
import IAuthService from '../interfaces/auth.service.interface';

export default class AuthenticationService implements IAuthService {
    readonly _db: Database;

    constructor() {
        this._db = database;
    }

    public async createUser(user: IUser): Promise<IUser> {
        return Promise.resolve(undefined);
    }

    public async findUserByEmail(email: string): Promise<IUser> {
        return Promise.resolve(undefined);
    }

    public async findUserByID(id: string): Promise<IUser> {
        return Promise.resolve(undefined);
    }

    public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
        return Promise.resolve(undefined);
    }
}
