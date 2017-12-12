import { Options } from 'request';

export interface RequestOptions implements Options {
    onError?: (message: any) => any;
}
