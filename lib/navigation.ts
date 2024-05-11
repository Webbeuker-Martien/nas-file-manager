import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation';
import { AllLocales } from 'next-intl/dist/types/src/shared/types';

export const locales = ['en', 'nl'] as const;
export type Locales = "en" | "nl";
export const localePrefix = 'always';
export const defaultLocale = 'nl';

export type ExtendedPathnames<Locales extends AllLocales> = Record<string, {
    [Key in Locales[number]]: string;
} & {
    name: string;
    showInMenu?: boolean;
    parentKey?: string;
}>;

const pagePaths = [
    {
        name: "page",
        link: {
            en: "/page",
            nl: "/page",
        }
    },
];

const dynamicPagePathnames = {} as ExtendedPathnames<typeof locales>;
for (const page of pagePaths) {
    const newPage = {
        ...page.link,
        name: page.name,
        parentKey: "/parent",
    }
    dynamicPagePathnames[`${page.link.en}`] = newPage
}

export const extendedPathnames: ExtendedPathnames<typeof locales> = {
    "/": {
        en: "/",
        nl: "/",
        name: "home",
    },
    "/about": {
        en: "/about",
        nl: "/over",
        name: "about_us",
        showInMenu: true
    },
    ...dynamicPagePathnames,
};

const mapBackToPathnames = (pathnames: ExtendedPathnames<typeof locales>) => {    
    return Object.keys(pathnames).reduce((acc, key) => {
        acc[key] = {
            en: pathnames[key].en,
            nl: pathnames[key].nl
        }
        return acc;
    }, {} as Pathnames<typeof locales>);
}

export const pathnames = mapBackToPathnames(extendedPathnames);

export type Href = keyof typeof pathnames;


export const route = (href: Href, locale: Locales, suffix = '') => {
    const pathName = getPathname({
		locale: locale,
		href: href
	});
	return `/${locale}${pathName}${suffix}`;
}

export const {Link, redirect, usePathname, useRouter, getPathname} = 
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});