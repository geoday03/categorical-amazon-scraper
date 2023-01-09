import { launch } from "puppeteer";
import UserAgent from "user-agents";

export default async function getAsins(category: string, limit: number) {
	const agent = new UserAgent({ deviceCategory: "desktop" }).toString();

	const browser = await launch({
		args: ["--window-size=1920,1080", agent, "--incognito"],
	});

	const page = await browser.newPage();

	const res = await page.goto(`https://amazon.com/s?k=${category}`, {
		waitUntil: "networkidle2",
	});

	await page.waitForSelector('[data-component-type="s-search-result"]', {
		visible: true,
		timeout: 0,
	});

	console.log("GET_ASIN", res?.status());

	const codes = await page.evaluate((limit: number) => {
		let results: string[] = [];

		const searchResults = document.body.querySelectorAll(
			'div[data-asin][data-component-type="s-search-result"]',
		);

		const l =
			searchResults.length - limit >= 0 ? limit : searchResults.length;

		for (let i = 0; i < l; i++) {
			const asin = searchResults[i].getAttribute("data-asin") ?? "";

			if (!results.includes(asin)) results.push(asin);
		}

		return results;
	}, limit);

	await browser.close();

	return codes;
}
