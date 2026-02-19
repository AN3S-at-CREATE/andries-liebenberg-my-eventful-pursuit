from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to Contact page...")
        page.goto("http://localhost:8080/contact")

        # Dump HTML
        with open("contact_page.html", "w") as f:
            f.write(page.content())
            print("Dumped HTML to contact_page.html")

        browser.close()

if __name__ == "__main__":
    run()
