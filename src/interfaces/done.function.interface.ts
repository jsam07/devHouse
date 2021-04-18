/* eslint-disable @typescript-eslint/no-explicit-any */
import { IVerifyOptions } from 'passport-local';

export default interface DoneFunction {
    (error: any, user?: any, options?: IVerifyOptions): void;
}
