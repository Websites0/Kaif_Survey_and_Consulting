import os
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Get the absolute path to the HTML files
    base_path = os.path.abspath('.')

    # Verify home.html
    page.goto(f'file://{base_path}/home.html')
    page.screenshot(path='jules-scratch/verification/home.png')

    # Verify about.html
    page.goto(f'file://{base_path}/about.html')
    page.screenshot(path='jules-scratch/verification/about.png')

    # Verify contact.html
    page.goto(f'file://{base_path}/contact.html')
    page.screenshot(path='jules-scratch/verification/contact.png')

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
