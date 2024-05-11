import { locales, extendedPathnames } from '@/lib/navigation';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const completeArray: MetadataRoute.Sitemap = [];
    for await (const locale of locales) {
        const currentLocaleArray:MetadataRoute.Sitemap = [];
        for await (const pathnameKey of Object.keys(extendedPathnames)) {
            const extendedPathname = extendedPathnames[pathnameKey as keyof typeof extendedPathnames];
            if (extendedPathname !== undefined) {
                currentLocaleArray.push({
                    url: `${process.env.NEXT_APP_URL}/${locale}${extendedPathname[locale]}`,
                    lastModified: new Date(),
                    changeFrequency: 'yearly',
                    priority: 1,
                });
            }
        }
        completeArray.push(...currentLocaleArray);
    }
    console.log(`Sitemap Found A Total Of ${completeArray.length} Pages.`);
    return completeArray;
}