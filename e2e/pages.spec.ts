import { expect, test } from "@playwright/test";
import { publicPaths } from "../lib/site";

const pages = [
  { path: "/", h1: /deux besoins/ },
  { path: "/marche-financier", h1: /Financez votre croissance/ },
  { path: "/trading", h1: /Investir sur les marchés/ },
  { path: "/conseil-fiscal", h1: /agents de l’État|agents de l'État/ },
  { path: "/a-propos", h1: /SUN Capital SARL/ },
];

for (const { path, h1 } of pages) {
  test(`${path} : titre, photo de bandeau, aucun débordement horizontal`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(/SUN Market/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
    await expect(page.locator("main section").first().locator("img")).toHaveJSProperty("complete", true);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
  });
}

test("chaque page a sa propre description", async ({ page }) => {
  const seen = new Set<string>();
  for (const { path } of pages) {
    await page.goto(path);
    const d = await page.locator('meta[name="description"]').getAttribute("content");
    expect(d, path).toBeTruthy();
    seen.add(d!);
  }
  expect(seen.size).toBe(pages.length);
});

test("le premier Tab mène au lien « Aller au contenu »", async ({ page, isMobile }) => {
  test.skip(isMobile, "navigation clavier : ordinateur seulement");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
});

test("une adresse inconnue affiche la page 404 du site", async ({ page }) => {
  const res = await page.goto("/page-qui-n-existe-pas");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Cette page n'existe pas." })).toBeVisible();
});

test("robots.txt et sitemap : public indexé, Secrétariat exclu", async ({ request, page }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /secretariat");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.match(/<loc>/g)?.length).toBe(publicPaths.length);
  await page.goto("/secretariat/login");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
