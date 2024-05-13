import { getTranslations } from "next-intl/server";
import { Locales } from "@/lib/navigation";

export const DefaultMetaPrefix = ` | ${process.env.NEXT_APP_TITLE_PREFIX}${process.env.NEXT_APP_NAME}`;
export const DefaultMetaOgImages = [
    '/images/og-image.jpg',
    '/images/og-image-square.jpg',
];

export const getGlobalConstants = async (locale: Locales | string = '') => {
    let t = (variable: string) => {
        return variable;
    }

    if (locale) {
        t = await getTranslations({ locale: locale, namespace: "shared" });
    }

    const hosts = [
        {
            id: 1,
            name: "81.206.163.214",
            host: "http://81.206.163.214:2000",
            image: "https://via.placeholder.com/150",
            description: "RPi NAS"
        },
        {
            id: 2,
            name: t("hosts.0.name"),
            host: "http://localhost:2000",
            image: "https://via.placeholder.com/150",
            description: t("hosts.0.description")
        },
        {
            id: 3,
            name: t("hosts.1.name"),
            host: "http://localhost:2000",
            image: "https://via.placeholder.com/150",
            description: t("hosts.1.description")
        },
    ];

    return {
        hosts
    };
};

export default getGlobalConstants;