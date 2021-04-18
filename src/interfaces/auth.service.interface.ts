import IUser from './user.interface';
import IDatabase from './database.interface';

export default interface AuthService {
    _db: IDatabase;
}
