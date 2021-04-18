import IUser from './user.interface';
import IDatabase from './database.interface';

export default interface UserService {
    _db: IDatabase;
    createUser(user: IUser): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser>;
    findUserByID(id: string): Promise<IUser>;
    getUserByEmailAndPassword(email: string, password: string): Promise<IUser>;
}
