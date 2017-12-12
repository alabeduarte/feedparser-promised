import { Options } from "feedparser";

export interface FeedparserOptions implements Options {
    onError?: (message: any) => any;
}
