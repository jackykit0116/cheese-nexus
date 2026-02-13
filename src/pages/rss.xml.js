import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { isPublishable } from '../lib/blog-filter';

export async function GET(context) {
	const all = await getCollection('blog');
	const posts = all.filter(isPublishable).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.slice(0, 50).map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
