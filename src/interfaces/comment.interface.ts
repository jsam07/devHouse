import IMessage from './message.interface_';

export default interface Comment extends IMessage {
    parentID: string;
}
