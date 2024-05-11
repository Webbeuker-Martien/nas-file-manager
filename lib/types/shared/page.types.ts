import { Href, Locales } from "@/lib/navigation";

export type Path = {
    en: string;
    nl: string;
}

export interface Params {
    locale: Locales;
    about: string;
    id: string;
}

export interface DefaultPageProps {
    params: Params;
}

export type SolutionPage = {
    id: string;
    title: string;
    link?: Path;
    pageLayout: DynamicPageContent[];
};

export interface DynamicPageContent {
    type: "hero" | "cards" | "component" | "component-section" | "component-grid";
    componentKey?: string;
    componentProps?: any;
    title?: string;
    subTitle?: string;
    text?: string;
    link?: Href;
    items?: DynamicPageItem[];
    buttons?: Array<any>;
}

export interface DynamicPageItem {
    title: string;
    text: string;
    link: Href;
}