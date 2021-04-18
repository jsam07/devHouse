/* eslint-disable class-methods-use-this,@typescript-eslint/no-unused-vars */
import IUser from '../interfaces/user.interface';
import Database from '../interfaces/database.interface';
import database from '../database/db/database_1615571003434.json';
import IAuthService from '../interfaces/auth.service.interface';
import HttpException from '../exceptions/HttpException';
import User from '../models/User.model';

export default class AuthenticationService implements IAuthService {
    readonly _db: Database;

    constructor() {
        this._db = database;
    }
}
