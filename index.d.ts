declare module 'feedparser-promised' {

	import { Options as RequestOptions } from 'request';
	import { Options as FeedparserOptions, Item } from 'feedparser';

	export function parse(url: string): Promise<Item[]>;
	export function parse(requestOptions: RequestOptions): Promise<Item[]>;
	export function parse(requestOptions: RequestOptions, feedparserOptions: FeedparserOptions): Promise<Item[]>;
}
