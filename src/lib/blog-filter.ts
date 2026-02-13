const MIN_BODY_LENGTH = 50;

export type BlogEntryLike = { data: { title?: string }; body?: string };

export function isPublishable(post: BlogEntryLike): boolean {
	const title = post.data.title ?? '';
	const body = (post.body ?? '').replace(/\s+/g, '');
	if (title.includes('[Draft]')) return false;
	if ((post.body ?? '').includes('Generation failed')) return false;
	if (body.length < MIN_BODY_LENGTH) return false;
	return true;
}
