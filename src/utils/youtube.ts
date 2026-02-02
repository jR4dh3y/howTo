/**
 * Extracts YouTube video ID from various URL formats
 * Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
 */
export function extractVideoId(url: string): string | null {
	if (!url) return null;

	// youtube.com/watch?v=VIDEO_ID
	const watchMatch = url.match(/[?&]v=([^&]+)/);
	if (watchMatch) return watchMatch[1];

	// youtu.be/VIDEO_ID
	const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
	if (shortMatch) return shortMatch[1];

	// youtube.com/embed/VIDEO_ID
	const embedMatch = url.match(/embed\/([^?&]+)/);
	if (embedMatch) return embedMatch[1];

	return null;
}

/**
 * Generates YouTube thumbnail URL for a video ID
 * Quality options: default, medium, high, maxres
 * Using medium (320x180) as default
 */
export function getThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'medium'): string {
	const qualityMap = {
		default: 'default',
		medium: 'mqdefault',
		high: 'hqdefault',
		maxres: 'maxresdefault',
	};

	return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Generates YouTube embed URL for a video ID
 */
export function getEmbedUrl(videoId: string): string {
	return `https://www.youtube.com/embed/${videoId}`;
}
