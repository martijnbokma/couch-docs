// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator'
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: 'https://couch-docs.github.io',
	base: '/couch-docs',
	integrations: [
		starlight({
			// plugins: [starlightThemeObsidian()],
			title: 'CouchCMS Docs',
			customCss: [
				'./src/assets/styles/custom.css'
			],
			logo: {
				light: '/src/assets/img/couchcms-primary-logo-black-gradient.svg',
				dark: '/src/assets/img/couchcms-primary-logo-white-gradient.svg',
				replacesTitle: true,
			},
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						'about-couch',
						'requirements',
						'installation',
						'upgrade',
						'localizing',
						'rebranding',
					],
				},
				{
					label: 'Concepts',
					autogenerate: { directory: 'concepts' },
				},
				{
					label: 'Tags Reference',
					autogenerate: { directory: 'tags-reference' },
				},
				{
					label: 'Tutorials',
					items: [
						{
							label: 'Building a Real-World Site',
							items: [
								'tutorials/portfolio-site/getting-started',
								'tutorials/portfolio-site/about-us',
								'tutorials/portfolio-site/blog',
								'tutorials/portfolio-site/blog-2',
								'tutorials/portfolio-site/portfolio',
								'tutorials/portfolio-site/contact-form',
								'tutorials/portfolio-site/home-page',
								'tutorials/portfolio-site/tying-the-loose-ends'
							],
						},
						{
							label: 'Advanced Tutorial',
							items: [
								'tutorials/advanced-tutorial/getting-started',
							],
						},
						{
							label: 'Building a Shopping Cart',
							items: [
								'tutorials/shopping-cart/shopping-cart-1',
								'tutorials/shopping-cart/shopping-cart-2',
							],
						},
						{
							label: 'On-Page Editing',
							items: [
								'tutorials/on-page-editing/on-page-editing',
							],
						},
						{
							label: 'Building a Job Application Form',
							items: [
								'tutorials/job-application-form/getting-started',
							],
						}
					]
				}
			],
		}),
	],
	// Add aliases for easier imports
	vite: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@components': path.resolve(__dirname, './src/components'),
				'@assets': path.resolve(__dirname, './src/assets'),
				'@layouts': path.resolve(__dirname, './src/layouts'),
				'@utils': path.resolve(__dirname, './src/utils'),
				'@content': path.resolve(__dirname, './src/content'),
			},
		},
		plugins: [starlightLinksValidator()],
	},
});