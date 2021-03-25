import IMessage from './message.interface';

export default interface Comment extends IMessage {
    parentID: string;
}
