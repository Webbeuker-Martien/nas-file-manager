import { NextIntlClientProvider, useMessages } from 'next-intl';
import cx from "classnames";
import { blinker } from "@/app/[locale]/fonts";

import "@/app/[locale]/globals.css";
import { Params } from "@/lib/types/shared/page.types";
import Topbar from "@/components/layout/Topbar";
import { headers } from 'next/headers';
import React from 'react';
// import Script from 'next/script';
import { DefaultMetaOgImages, DefaultMetaPrefix } from '@/lib/constants';
import { defaultLocale } from '@/lib/navigation';

const title = `${DefaultMetaPrefix}${'page'}`;
export const metadata = {
	metadataBase: new URL(process.env.NEXT_APP_URL ?? 'https://localhost:3000'),
	title: title,
	openGraph: {
		title: title,
		images: DefaultMetaOgImages,
	},
};

type LayoutProps = {
	topbar: 'hosts' | 'host' | 'breadcrumb' | '' | Array<'hosts' | 'host' | 'breadcrumb'>;
	topbarData?: any;
	children: React.ReactNode;
	params: Params;
};

type Theme = 'light' | 'dark';

export default function RootLayout({ topbar = '', topbarData, children, params }: LayoutProps) {
	const messages = useMessages();
	const theme: Theme = 'dark';
	// const nonce = headers().get('x-nonce');

	return (
		<html lang={params.locale ?? defaultLocale}>
			<body id="root" className={`${cx(blinker.className)} ${theme}`}>
				<NextIntlClientProvider locale={params.locale ?? defaultLocale} messages={messages}>
					<>
						<Topbar topbar={topbar} data={topbarData} params={params ?? { locale: defaultLocale }} />
						<main className="min-h-dvh pb-4">
							{children}
						</main>
					</>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
