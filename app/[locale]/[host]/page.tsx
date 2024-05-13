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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const title = `${params.host}${DefaultMetaPrefix}`;

	params.host = params.host.replace(/%20/g, " ");

	return {
		title: title,
		description: params.host,
		openGraph: {
			title: title,
			description: params.host
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