import createIntlMiddleware from 'next-intl/middleware';
import { Locales, defaultLocale, localePrefix, locales, pathnames } from '@/lib/navigation';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
	const handleI18nRouting = createIntlMiddleware({
		localePrefix: localePrefix,
		locales: locales,
		defaultLocale: defaultLocale,
		pathnames: pathnames,
	});
	const response = handleI18nRouting(request);

	const baseUrl = process.env.NEXT_APP_URL ?? 'http://localhost:3000';
	const locale: Locales = response.headers.get('X-Middleware-Rewrite')?.replace(baseUrl, '')?.split('/')[1] as Locales ?? defaultLocale;	

	const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
	// const cspHeader = `
	// 	default-src 'self' data: blob:;
	// 	script-src 'self' 'unsafe-inline' 'strict-dynamic' 'unsafe-eval' 'nonce-${nonce}';
	// 	script-src-elem 'self' 'nonce-${nonce}';
	// 	style-src 'self' 'unsafe-inline';
	// 	style-src-elem 'self' 'unsafe-inline';
	// 	img-src 'self' data: blob: ;
	// 	font-src 'self';
	// 	object-src 'none';
	// 	base-uri 'self';
	// 	form-action 'self';
	// 	frame-ancestors 'none';
	// 	block-all-mixed-content;
	// 	upgrade-insecure-requests;
	// 	connect-src 'self' ${process.env.NEXT_API_HOST};
	// 	frame-src 'self';
	// 	media-src 'self' data: blob:;
	// `;

	// const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

	response.headers.set('x-nonce', nonce);
	response.headers.set('x-locale', locale);
	// response.headers.set(
	// 	'Content-Security-Policy',
	// 	contentSecurityPolicyHeaderValue
	// );

	return response;
}

export const config = {
	matcher: [
		'/',
		'/(nl|en)/:path*',
	],
};