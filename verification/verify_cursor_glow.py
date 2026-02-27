
import asyncio
from playwright.async_api import async_playwright, expect

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Test 1: Desktop - Glow element should be present
        context_desktop = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page_desktop = await context_desktop.new_page()
        print("Navigating to desktop view...")
        await page_desktop.goto("http://localhost:8080")

        # Wait for initial loading
        await page_desktop.wait_for_timeout(5000)

        # The glow component is a div with fixed positioning and specific background classes
        # Based on the code: <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        # And it contains motion divs with specific background colors

        # We look for the motion div inside the container
        # The container is the only z-50 fixed inset-0 element in the app likely
        # But let's be more specific if possible. The component doesn't have an ID.
        # However, the inner motion divs have classes like 'rounded-full blur-[80px]'

        glow_locator = page_desktop.locator("div.fixed.z-50.overflow-hidden >> .blur-\\[80px\\]")

        try:
            await expect(glow_locator).to_be_visible(timeout=5000)
            print("✅ Desktop: Glow element found.")
        except AssertionError:
            print("❌ Desktop: Glow element NOT found (unexpected).")

        await page_desktop.screenshot(path="verification/desktop_glow.png")

        # Test 2: Mobile - Glow element should be ABSENT
        # iPhone 12 viewport is 390x844
        context_mobile = await browser.new_context(viewport={"width": 390, "height": 844})
        page_mobile = await context_mobile.new_page()
        print("Navigating to mobile view...")
        await page_mobile.goto("http://localhost:8080")

        await page_mobile.wait_for_timeout(5000)

        glow_locator_mobile = page_mobile.locator("div.fixed.z-50.overflow-hidden >> .blur-\\[80px\\]")

        if await glow_locator_mobile.count() == 0:
             print("✅ Mobile: Glow element correctly absent.")
        else:
             print("❌ Mobile: Glow element found (unexpected).")

        await page_mobile.screenshot(path="verification/mobile_no_glow.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
