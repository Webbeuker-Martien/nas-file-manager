'use client';

import { createRef, useEffect } from "react";

import { Params } from "@/lib/types/shared/page.types";
import { useTranslations } from "next-intl";

import BackBtn from "@/components/shared/BackBtn";
import Breadcrumb from "@/components/shared/Breadcrumb";

import Image from "next/image";
import Each from "../helpers/Each";

type TopbarProps = {
	topbar: 'hosts' | 'host' | 'breadcrumb' | '' | Array<'hosts' | 'host' | 'breadcrumb'>;
	data?: any;
	params: Params;
}

export default function Topbar({ topbar = '', data, params }: TopbarProps) {
	const t = useTranslations("shared.topbar");

	const topbarRef = createRef<HTMLDivElement>();

	let prevScrollpos = 0;

	const handleScroll = () => {
		let timeout: any;
		let isScrolling = false;
	
		window.addEventListener("scroll", function() {
			const currentScrollPos = window.pageYOffset;
	
			if (!isScrolling) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					if (topbarRef.current !== null) {
						topbarRef.current.classList.add("top-0");
					}
				}, 2000);
			}
	
			if (Math.abs(prevScrollpos - currentScrollPos) > 5) {
				if (prevScrollpos > currentScrollPos) {
					clearTimeout(timeout);
					if (topbarRef.current !== null) {
						topbarRef.current.classList.add("top-0");
					}

					prevScrollpos = currentScrollPos;

					return;
				}

				isScrolling = true;
				clearTimeout(timeout);
				if (topbarRef.current !== null) {
					topbarRef.current.classList.remove("top-0");
				}
				setTimeout(() => {
					isScrolling = false;
				}, 100);
			}
	
			prevScrollpos = currentScrollPos;
		});
	};

	useEffect(() => {
		if (topbarRef.current !== null) {
			const style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = `
				.topbar-scroll {
					top: -${topbarRef.current.clientHeight}px;
				}
			`;
			document.getElementsByTagName('head')[0].appendChild(style);
	
			topbarRef.current.classList.add("topbar-scroll");
		};


		prevScrollpos = window.pageYOffset;

		window.addEventListener("scroll", handleScroll);


		const main = document.querySelector("main");
		
		if (main !== null && topbarRef.current !== null) {
			main.style.paddingTop = `${topbarRef.current.clientHeight + 16}px`;
		} else {
			main!.classList.add("pt-content-plus-4");
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		}
	}, []);

	return (
		<header ref={topbarRef} className="bg-dark-900 border-b border-dark-800 px-3 md:px-10 py-3 fixed z-50 top-0 w-full min-h-topbar flex flex-col justify-center transition-all duration-500">
			{topbar === 'hosts' && (
				<div className="flex justify-between items-center">
					<h1 className="leading-5 ml-15">{t('select_host')}</h1>

					<Image
						src="/images/icons/options.svg"
						width={28}
						height={28}
						className="w-7 h-auto fade-in opacity-10"
						alt="Options"
					/>
				</div>
			)}
			
			{(topbar === 'host' || (Array.isArray(topbar) && (topbar.includes('host')))) && (
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-5">
						<BackBtn params={params} />

						<h1 className="leading-5">{data.host.name}</h1>
					</div>

					<div className="flex gap-5">
						<Image
							src="/images/icons/search.svg"
							width={24}
							height={24}
							className="w-6 h-auto fade-in opacity-10"
							alt="Search"
						/>

						<Image
							src="/images/icons/options.svg"
							width={28}
							height={28}
							className="w-7 h-auto fade-in opacity-10"
							alt="Options"
						/>
					</div>
				</div>
			)}
			
			{(topbar === 'breadcrumb' || (Array.isArray(topbar) && topbar.includes('breadcrumb'))) && (
				<Breadcrumb data={data} params={params} />
			)}
		</header>
	)
}
