const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await page.goto(`http://localhost:5173`)
		// await request.post("/api/testing/reset");
		// await request.post("/api/users", {
		// 	data: {
		// 		username: "lukazed",
		// 		name: "lokmane",
		// 		password: "admin123",
		// 	},
		// });

		// await page.goto("/");
	});

	test("login form is shown", async ({ page }) => {
		await expect(page.getByText("Log in into Application")).toBeVisible();
		await expect(page.getByText("Username")).toBeVisible();
		await expect(page.getByText("Password")).toBeVisible();
		await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
	});
});
