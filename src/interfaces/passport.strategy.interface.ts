import { Strategy } from 'passport';

export default interface PassportStrategy {
    name: string;
    strategy: Strategy;
}
