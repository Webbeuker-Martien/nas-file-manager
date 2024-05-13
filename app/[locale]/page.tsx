import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DefaultPageProps } from "@/lib/types/shared/page.types";
import { DefaultMetaOgImages, DefaultMetaPrefix, getGlobalConstants } from "@/lib/constants";
import Container from "@/components/shared/Container";
import RootLayout from "./defaultLayout";
import Each from "@/components/helpers/Each";
import { route } from "@/lib/navigation";

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
	const t = await getTranslations({ locale: params.locale, namespace: "pages.home" });
	
	const title = `${t('meta.title')}${DefaultMetaPrefix}`;
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

export default async function Home({ params }: DefaultPageProps) {
	const t = await getTranslations({ locale: params.locale, namespace: "pages.home" });

	const { hosts } = await getGlobalConstants(params.locale);

	return (
		<RootLayout topbar="hosts" params={params}>
			<section>
				<Container padding={false}>
					<div className="flex flex-col gap-3">
						<Each of={hosts} render={(host, index) => (
							// <a href={route('/', params.locale)} className="bg-dark-900 border border-dark-800 rounded-lg p-3">
							<a href={`/${params.locale}/${host.name}`} className="bg-dark-900 border border-dark-800 rounded-lg p-3">
								<h1>{host.name}</h1>
								<p className="text-dark-50">{host.description}</p>
							</a>
						)} />
					</div>
				</Container>
			</section>
		</RootLayout>
	);
}