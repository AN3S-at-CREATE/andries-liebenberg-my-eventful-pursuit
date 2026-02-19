from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            print("Navigating to http://localhost:8080/auth")
            page.goto("http://localhost:8080/auth")

            # Wait for page load
            page.wait_for_load_state("networkidle")

            # Click "Sign up" toggle button at the bottom
            # It's a button with text "Sign up"
            print("Clicking Sign up toggle")
            page.get_by_role("button", name="Sign up").click()

            # Now the submit button should say "Create Account"
            # Verify we are in Sign Up mode
            print("Verifying Sign Up mode")
            create_account_btn = page.get_by_role("button", name="Create Account")
            create_account_btn.wait_for()

            # Test 1: Short password
            print("Testing short password: 'weak'")
            page.get_by_label("Email").fill("test@example.com")
            # Use specific locator for password input
            page.locator("input#password").fill("weak")
            create_account_btn.click()

            # Check for error "Password must be at least 8 characters"
            print("Checking for error message")
            error_short = page.get_by_text("Password must be at least 8 characters")
            error_short.wait_for()
            print("SUCCESS: Short password error visible")

            # Test 2: Missing uppercase
            print("Testing missing uppercase: 'weakpassword1!'")
            page.locator("input#password").fill("weakpassword1!")
            create_account_btn.click()

            # Check for error "Password must contain at least one uppercase letter"
            print("Checking for uppercase error message")
            error_upper = page.get_by_text("Password must contain at least one uppercase letter")
            error_upper.wait_for()
            print("SUCCESS: Missing uppercase error visible")

            # Take screenshot
            page.screenshot(path="verification.png")
            print("Screenshot saved to verification.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    run()
