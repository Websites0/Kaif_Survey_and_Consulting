
import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path to the HTML files
        base_path = os.path.abspath('.')

        # --- Homepage Verification ---
        await page.goto(f'file://{base_path}/index.html')

        # Desktop
        await page.set_viewport_size({'width': 1920, 'height': 1080})
        await page.screenshot(path='jules-scratch/verification/home-desktop.png')

        # Tablet
        await page.set_viewport_size({'width': 768, 'height': 1024})
        await page.screenshot(path='jules-scratch/verification/home-tablet.png')

        # Mobile
        await page.set_viewport_size({'width': 375, 'height': 812})
        await page.screenshot(path='jules-scratch/verification/home-mobile.png')

        # --- About Us Page Verification ---
        await page.goto(f'file://{base_path}/about.html')

        # Desktop
        await page.set_viewport_size({'width': 1920, 'height': 1080})
        await page.screenshot(path='jules-scratch/verification/about-desktop.png')

        # Tablet
        await page.set_viewport_size({'width': 768, 'height': 1024})
        await page.screenshot(path='jules-scratch/verification/about-tablet.png')

        # Mobile
        await page.set_viewport_size({'width': 375, 'height': 812})
        await page.screenshot(path='jules-scratch/verification/about-mobile.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
