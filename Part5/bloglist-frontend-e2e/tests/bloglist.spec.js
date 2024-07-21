const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");
describe("Blog app", () => {
	beforeEach(async ({ page, request }) => {
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
			const blog = {
				title: "How to Deploy a Web App",
				author: "Beau Carnes",
				url: "https://www.freecodecamp.org/news/how-to-deploy-a-web-app",
			};
			await createBlog(page, blog.title, blog.author, blog.url);
			await expect(
				page.getByText(`a new blog ${blog.title} added by ${blog.author}`)
			).toBeVisible();

			await expect(page.getByRole("button", { name: "create" })).toBeVisible();
			await expect(
				page.getByText("How to Deploy a Web App Beau Carnes")
			).toBeVisible();
			await expect(page.getByRole("button", { name: "view" })).toBeVisible();
		});
		describe("And several blogs exists", () => {
			beforeEach(async ({ page }) => {
				await createBlog(page, "test-1", "lukazed", "http://test1.com");
				await createBlog(page, "test-2", "lukazed", "http://test2.com");
				await createBlog(page, "test-3", "lukazed", "http://test3.com");
			});

			test("the blog can be edited", async ({ page }) => {
				const blog = page.locator(".blog").filter({ hasText: "test-1" });
				await blog.getByRole("button", { name: "view" }).click();

				await expect(blog.getByText("likes 0")).toBeVisible();
				await blog.getByRole("button", { name: "like" }).click();

				await expect(blog.getByText("likes 1")).toBeVisible();
				await expect(blog.getByText("likes 0")).not.toBeVisible();
			});
			test("the user who added the blog can delete it", async ({ page }) => {
				const blog = page.locator(".blog").filter({ hasText: "test-2" });
				const outerHTML = await blog.evaluate((element) => element.outerHTML);
				console.log("🚀 ~ test ~ blog:", outerHTML);
				await blog.getByRole("button", { name: "view" }).click();
				const outerHTML2 = await blog.evaluate((element) => element.outerHTML);
				console.log("🚀 ~ test ~ blog:", outerHTML2);
				await expect(
					blog.getByRole("button", { name: "remove" })
				).toBeVisible();

				await page.getByRole("button", { name: "remove" }).click();
				page.on("dialog", async (dialog) => {
					await dialog.accept();
				});

				await expect(blog.getByText("test-2")).not.toBeVisible();
				await expect(blog).not.toBeVisible();
			});
			test("only the user who added the blog sees the remove button", async ({
				page,
				request,
			}) => {
				const blog = page.locator(".blog").filter({ hasText: "test-3" });
				await blog.getByRole("button", { name: "view" }).click();
				await expect(
					blog.getByRole("button", { name: "remove" })
				).toBeVisible();

				await page.getByRole("button", { name: "Log Out" }).click();
				await request.post("/api/users", {
					data: {
						username: "test-user",
						name: "Zeddoun",
						password: "user123",
					},
				});
				await loginWith(page, "test-user", "user123");

				await blog.getByRole("button", { name: "view" }).click();
				await expect(
					blog.getByRole("button", { name: "remove" })
				).not.toBeVisible();
			});
			test("blogs should be organized from most likes to least likes", async ({
				page,
			}) => {
				const blog1 = page.locator(".blog").filter({ hasText: "test-1" });
				const blog2 = page.locator(".blog").filter({ hasText: "test-2" });
				const blog3 = page.locator(".blog").filter({ hasText: "test-3" });

				await blog1.getByRole("button", { name: "view" }).click();
				await blog2.getByRole("button", { name: "view" }).click();
				await blog3.getByRole("button", { name: "view" }).click();

				await blog3.getByRole("button", { name: "like" }).click();
				await blog3.getByRole("button", { name: "like" }).click();
				await blog2.getByRole("button", { name: "like" }).click();

				expect(blog3).toContainText("likes 2");
				expect(blog2).toContainText("likes 1");
				expect(blog1).toContainText("likes 0");

				expect(page.locator(".blog").first()).toContainText("test-3");
				expect(page.locator(".blog").nth(1)).toContainText("test-2");
				expect(page.locator(".blog").last()).toContainText("test-1");
			});
		});
	});
});
