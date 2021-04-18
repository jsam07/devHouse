import IMessage from './message.interface';
import ILocation from './location.interface';

export default interface Post extends IMessage {
    geo?: ILocation;
    caption?: string;
    reposts?: string[];
}
