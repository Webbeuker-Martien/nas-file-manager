import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DefaultPageProps, Params } from "@/lib/types/shared/page.types";
import { DefaultMetaOgImages, DefaultMetaPrefix, getGlobalConstants } from "@/lib/constants";
import Container from "@/components/shared/Container";
import RootLayout from "../defaultLayout";
import Files from "@/components/shared/Files";
import { log } from "util";

interface ExtendedParams extends Params {
    host: string;
}

interface Props extends DefaultPageProps {
    params: ExtendedParams;
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
	const t = await getTranslations({ locale: params.locale, namespace: "pages.home" });
	
	const title = `${DefaultMetaPrefix}${t('meta.title')}`;
    const description = t('meta.description');

	return {
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			images: DefaultMetaOgImages,
		},
	}
}

export default async function Home({ params }: Props) {
	const t = await getTranslations({ locale: params.locale, namespace: "pages.home" });

	const { hosts } = await getGlobalConstants(params.locale);

	params.host = params.host.replace(/%20/g, " ");

	const host = hosts.find((host) => host.name === params.host);

	return (
		<RootLayout topbar={['host', 'breadcrumb']} topbarData={{
			host: host,
			path: [],
		}} params={params}>
			<section>
				<Container padding={false}>
					<Files host={host} path={'/dir'} params={params} />
				</Container>
			</section>
		</RootLayout>
	);
}