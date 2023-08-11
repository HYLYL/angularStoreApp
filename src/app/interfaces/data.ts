import { Error } from './error';

export interface Data {
    user?: string;
    token?: string;
    error: Error;
}