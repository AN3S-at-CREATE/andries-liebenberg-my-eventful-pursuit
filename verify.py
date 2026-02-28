from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        print("Navigating to http://localhost:8080...")
        page.goto("http://localhost:8080")

        # Wait for LoadingScreen to disappear
        print("Waiting for loading screen to disappear...")
        loading_screen = page.locator("[role='status']")
        loading_screen.wait_for(state="detached", timeout=15000)

        # Wait to ensure initial DOM renders
        print("Waiting for general ready state...")
        page.wait_for_load_state("networkidle")

        # Wait specifically for the canvas animation to draw frames
        print("Waiting for 2000ms for canvas render loop...")
        page.wait_for_timeout(2000)

        # Take a screenshot
        screenshot_path = "verification_screenshot.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify()
