import React, { useEffect } from "react";

import { Params, DefaultPageProps } from "@/lib/types/shared/page.types";

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RootLayout from "@/app/[locale]/defaultLayout";
import { DefaultMetaPrefix, getGlobalConstants } from "@/lib/constants";
import Container from "@/components/shared/Container";
import Files from "@/components/shared/Files";

import path from "path";

interface MetaProps extends DefaultPageProps {
    params: ExtendedParams;
}

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
	params.host = params.host.replace(/%20/g, " ");
	params.path = params.path.map((p) => p.replace(/%20/g, " "));

	const title = `${params.path.pop()}${DefaultMetaPrefix}`;
	
	return {
		title: title,
		description: params.host + ' - ' + params.path.join(' / '),
		openGraph: {
			title: title,
			description: params.host + ' - ' + params.path.join(' / '),
		},
	}
}

interface ExtendedParams extends Params {
    host: string;
    path: Array<string>;
}
interface Props extends DefaultPageProps {
    params: ExtendedParams;
}

export default async function PathPage({ params }: Props) {
    params.host = params.host.replace(/%20/g, " ");
    params.path = params.path.map((p) => p.replace(/%20/g, " "));

	const { hosts } = await getGlobalConstants(params.locale);

    const host = hosts.find((host) => host.name === params.host);

	return (
        <RootLayout topbar={['host', 'breadcrumb']} topbarData={{
            host: host,
            path: params.path,
        }} params={params}>
			<section>
				<Container padding={false}>
					<Files host={host} path={path.join('/dir', ...params.path)} params={params} />
				</Container>
			</section>
		</RootLayout>
    );
	// const newsItemPage = newsItems.find((page) => page.id === params.path);

	// if (!newsItemPage) {
	// 	return <><h1>Hello world</h1></>;
	// }
	
	// return (
    //     <DynamicPageContent params={params} pageLayout={newsItemPage!.pageLayout} />
	// );
}