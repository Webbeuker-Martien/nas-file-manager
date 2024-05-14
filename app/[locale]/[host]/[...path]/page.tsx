import React, { useEffect } from "react";

import { Params, DefaultPageProps } from "@/lib/types/shared/page.types";

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RootLayout from "@/app/[locale]/defaultLayout";
import { DefaultMetaPrefix, getGlobalConstants } from "@/lib/constants";
import Container from "@/components/shared/Container";
import Files from "@/components/shared/Files";

import path from "path";
import Passwd from "@/components/shared/Passwd";

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
    // params.host = decodeURI(params.host).replaceAll("%23", "#");
    // params.path = params.path.map((p) => decodeURI(p).replaceAll("%23", "#"));

	const { hosts } = await getGlobalConstants(params.locale);

    const host = hosts.find((host) => host.name === params.host);

	return (
        <RootLayout topbar={['host', 'breadcrumb']} topbarData={{
            host: host,
            path: params.path.map((p) => decodeURI(p).replaceAll("%23", "#").replaceAll("%24", "$").replaceAll("%26", "&").replaceAll("%40", "@")),
        }} params={params}>
			<Passwd>
				<section>
					<Container padding={false}>
						<Files host={host} path={path.join('/dir', ...params.path)} params={params} />
					</Container>
				</section>
			</Passwd>
		</RootLayout>
    );
}