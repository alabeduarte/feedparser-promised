declare module 'feedparser-promised' {
	
	import { Options } from 'request';
	import { Item } from 'node-feedparser';
	
	export function parse(url: string): Promise<Item[]>;
	export function parse(options: Options): Promise<Item[]>;
}