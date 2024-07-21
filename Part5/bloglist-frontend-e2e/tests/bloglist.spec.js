const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");
describe("Blog app", () => {
	beforeEach(async ({ page,request }) => {
		await request.post("/api/testing/reset");
		await request.post("/api/users", {
			data: {
				username: "lukazed",
				name: "lokmane",
				password: "admin123",
			},
		});
		await page.goto(`/`);
	});

	test("login form is shown", async ({ page }) => {
		await expect(page.getByText("Log in into Application")).toBeVisible();
		await expect(page.getByText("Username")).toBeVisible();
		await expect(page.getByText("Password")).toBeVisible();
		await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
	});

	describe("Login", () => {
		test("succeeds with correct credentials", async ({ page }) => {
			await loginWith(page, "lukazed", "admin123");

			const successDiv = await page.locator(".msg");
			console.log(successDiv);
			await expect(successDiv).toContainText("logged in lokmane");
			await expect(successDiv).toHaveCSS("border-style", "solid");
			await expect(successDiv).toHaveCSS("color", "rgb(0, 128, 0)");
			await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();
		});

		test("fails with wrong credentials", async ({ page }) => {
			await loginWith(page, "lukazed", "wrong");

			const errorDiv = await page.locator(".msg");

			await expect(errorDiv).toContainText("Wrong username or password");
			await expect(errorDiv).toHaveCSS("border-style", "solid");
			await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
			await expect(page.getByText("logged in lokmane")).not.toBeVisible();
		});
	});
	describe("When logged in", () => {
		beforeEach(async ({ page }) => {
			await loginWith(page, "lukazed", "admin123");
		});

		test("a new blog can be created", async ({ page }) => {
			await createBlog(
				page,
				"How to Deploy a Web App",
				"Beau Carnes",
				"https://www.freecodecamp.org/news/how-to-deploy-a-web-app"
			);
			await expect(
				page.getByText(
					"a new blog How to Deploy a Web App added by Beau Carnes"
				)
			).toBeVisible();

			await expect(page.getByRole("button", { name: "create" })).toBeVisible();
			await expect(
				page.getByText("How to Deploy a Web App Beau Carnes")
			).toBeVisible();
			await expect(page.getByRole("button", { name: "view" })).toBeVisible();
			
		});
	});
});
