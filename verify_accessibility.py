from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a new context with a mobile viewport to simulate mobile
        context = browser.new_context(viewport={"width": 375, "height": 812})
        page = context.new_page()

        print("Navigating to Contact page...")
        page.goto("http://localhost:8080/contact")

        # Wait for loading screen to disappear
        print("Waiting for page content...")
        try:
            page.wait_for_selector('h1:has-text("Get in Touch")', timeout=10000)
            print("Page content loaded.")
        except Exception as e:
            print(f"Timed out waiting for page content: {e}")
            page.screenshot(path="verification_timeout.png")
            browser.close()
            return

        # 1. Verify Social Links
        print("Locating social links in main content...")
        try:
            # Target links inside main to avoid navbar
            github_links = page.locator('main a[href*="github.com"]')
            linkedin_links = page.locator('main a[href*="linkedin.com"]')

            # Scroll to make sure they are in view (though scroll_into_view_if_needed handles it)
            if github_links.count() > 0:
                print(f"Found {github_links.count()} GitHub links in main.")
                first_github = github_links.first
                first_github.scroll_into_view_if_needed(timeout=5000)
                print(f"GitHub link visible: {first_github.is_visible()}")
                label = first_github.get_attribute('aria-label')
                print(f"GitHub link aria-label: {label}")
                assert label == "GitHub Profile", f"Expected 'GitHub Profile', got '{label}'"
            else:
                print("No GitHub link found in main.")

            if linkedin_links.count() > 0:
                print(f"Found {linkedin_links.count()} LinkedIn links in main.")
                first_linkedin = linkedin_links.first
                first_linkedin.scroll_into_view_if_needed(timeout=5000)
                print(f"LinkedIn link visible: {first_linkedin.is_visible()}")
                label = first_linkedin.get_attribute('aria-label')
                print(f"LinkedIn link aria-label: {label}")
                assert label == "LinkedIn Profile", f"Expected 'LinkedIn Profile', got '{label}'"
            else:
                print("No LinkedIn link found in main.")

        except Exception as e:
            print(f"❌ Failed to verify social links: {e}")
            page.screenshot(path="verification_contact_fail.png")

        # Screenshot Contact Page
        page.screenshot(path="verification_contact.png")

        # 2. Verify Concierge Tabs (Already passed, but keeping it)
        print("Checking for Concierge button...")
        try:
            # Look for button with sr-only text "Ask AN3S Concierge"
            concierge_btn = page.locator('button:has(span.sr-only:has-text("Ask AN3S Concierge"))')

            if not concierge_btn.is_visible():
                print("Button not found on Contact page, trying Home...")
                page.goto("http://localhost:8080/")
                page.wait_for_selector('h1', timeout=10000)
                concierge_btn = page.locator('button:has(span.sr-only:has-text("Ask AN3S Concierge"))')
                concierge_btn.wait_for(state="visible", timeout=5000)

            if concierge_btn.is_visible():
                concierge_btn.click()
                print("Clicked Concierge button.")

                # Wait for modal content
                growth_tab = page.locator('button[aria-label="Growth"]')
                growth_tab.wait_for(state="visible", timeout=5000)

                tabs = ["Growth", "AI Systems", "Marketing", "Projects"]
                for tab in tabs:
                    el = page.locator(f'button[aria-label="{tab}"]')
                    if el.is_visible():
                         print(f"✅ Tab '{tab}' verified with aria-label.")
                    else:
                         print(f"❌ Tab '{tab}' not visible.")

                # Screenshot Concierge
                page.screenshot(path="verification_concierge.png")
            else:
                print("❌ Concierge button not found.")
        except Exception as e:
            print(f"❌ Failed to verify Concierge tabs: {e}")

        browser.close()

if __name__ == "__main__":
    run()
