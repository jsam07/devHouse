import IMessage from './message.interface_';
import ILocation from './location.interface_';

export default interface Post extends IMessage {
    geo?: ILocation;
    caption?: string;
    reposts?: string[];
}
