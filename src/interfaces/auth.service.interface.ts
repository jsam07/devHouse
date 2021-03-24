import IUser from './user.interface_';
import IDatabase from './database.interface_';

export default interface AuthService {
    _db: IDatabase;
    createUser(user: IUser): Promise<IUser>;
    findUserByID(id: string): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser>;
    getUserByEmailAndPassword(email: string, password: string): Promise<IUser>;
}
