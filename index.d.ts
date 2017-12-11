declare module 'feedparser-promised' {

	import { Options as RequestOptions } from 'request';
	import { Options as FeedparserOptions } from 'feedparser';
	import { Item } from 'node-feedparser';

	export function parse(url: string): Promise<Item[]>;
	export function parse(requestOptions: RequestOptions): Promise<Item[]>;
	export function parse(requestOptions: RequestOptions, feedparserOptions: FeedparserOptions): Promise<Item[]>;
}
