import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DefaultPageProps, Params } from "@/lib/types/shared/page.types";
import { DefaultMetaPrefix, getGlobalConstants } from "@/lib/constants";
import Container from "@/components/shared/Container";
import RootLayout from "@/app/[locale]/defaultLayout";
import Files from "@/components/shared/Files";
import Passwd from "@/components/shared/Passwd";

interface ExtendedParams extends Params {
    host: string;
}

interface Props extends DefaultPageProps {
    params: ExtendedParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const title = `${params.host}${DefaultMetaPrefix}`;

	params.host = decodeURI(params.host).replaceAll("%23", "#");

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
	const t_shared = await getTranslations({ locale: params.locale, namespace: "shared" });

	const { hosts } = await getGlobalConstants(params.locale);

	// params.host = params.host.replace(/%20/g, " ");

	// ======================================
	// Dit moet anders
	// ======================================
	console.log(params);
	
	const host = hosts.find((host) => host.name === params.host && host.type === 'music');
	console.log(host);
	

	return (
		<RootLayout topbar={['host', 'breadcrumb']} topbarData={{
			host: host,
			type: 'music',
			path: [],
		}} params={params}>
			{/* <Passwd> */}
				<section>
					Get all music files from specified host
				</section>
			{/* </Passwd> */}
		</RootLayout>
	);
}