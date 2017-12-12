declare module 'feedparser-promised' {

	import { RequestOptions } from './request-options-ext';
	import { FeedparserOptions } from './feedparser-options-ext';
	import { Item } from 'node-feedparser';

	export function parse(url: string): Promise<Item[]>;
	export function parse(requestOptions: RequestOptions): Promise<Item[]>;
	export function parse(requestOptions: RequestOptions, feedparserOptions: FeedparserOptions): Promise<Item[]>;
}
