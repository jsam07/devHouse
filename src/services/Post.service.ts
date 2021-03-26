import IUser from '../interfaces/user.interface';
import Database from '../interfaces/database.interface';
import database from '../database/database_1615571003434.json';
import IPostService from '../interfaces/post.service.interface';

export default class PostService implements IPostService {
    readonly _db: Database;

    constructor() {
        this._db = database;
    }
}
