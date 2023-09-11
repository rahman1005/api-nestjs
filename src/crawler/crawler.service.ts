import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { FatSecretDto } from './dto/crawler.dto';
import { FatSecret } from './interfaces/crawler';

@Injectable()
export class CrawlerService {
    private url: string;

    constructor() {
        this.url = `https://www.fatsecret.co.id/kalori-gizi/search`;
    }

    async list(fatSecretDto: FatSecretDto): Promise<Array<FatSecret>> {
        const browser = await puppeteer.launch({
            headless: 'new',
        });

        try {
            const page = await browser.newPage();

            page.on('console', async (msg) => {
                const msgArgs = msg.args();
                for (let i = 0; i < msgArgs.length; ++i) {
                    console.log(await msgArgs[i].jsonValue());
                }
            });

            let url = this.url;

            await page.goto(url);
            // Type into search box
            await page.type('.searchInput', fatSecretDto.key);

            // Wait and click on first result
            const searchResultSelector = 'a.button';
            await page.waitForSelector(searchResultSelector);
            await page.click(searchResultSelector);

            if (fatSecretDto.page > 1) {
                const searchPagingSelector = 'div.searchResultsPaging > a';
                await page.waitForSelector(searchPagingSelector);
                // await page.click(searchPagingSelector);
                const selectedUrl: string = await page.evaluate((fatSecretDto) => {
                    const collection: Array<Element> = Array.from(document.querySelectorAll('div.searchResultsPaging > a'));
                    const selected: Element = collection.find((el: Element) => parseInt(el.textContent) && parseInt(el.textContent) == fatSecretDto.page);
                    if (selected) {
                        return selected.getAttribute('href');
                    }
                }, fatSecretDto);

                if (selectedUrl) {
                    url = url.replace('/kalori-gizi/search', selectedUrl);
                }
                await page.goto(url);
            }


            const tdSelector: string = 'tr > td.borderBottom';
            await page.waitForSelector(tdSelector);

            const data: Array<FatSecret> = await page.evaluate(() => {
                const tds = Array.from(document.querySelectorAll('tr > td.borderBottom'));
                return tds.map((el: Element) => {
                    const title = el.getElementsByClassName('prominent')[0].textContent;
                    const description = el.getElementsByClassName('smallText')[0].textContent;
                    return { title, description };
                });
            });
            await browser.close();
            return data;

        } catch (error) {
            console.log('error', error)
        }
    }
}
