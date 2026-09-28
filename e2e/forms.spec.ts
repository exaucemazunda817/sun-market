import { expect, test } from "@playwright/test";
import { DossierFormSection, mockDossiersApi } from "./pages/DossierFormSection";

test("Investisseur : envoi réussi, données transmises, confirmation affichée", async ({ page }) => {
  const calls = await mockDossiersApi(page);
  await page.goto("/marche-financier/investisseurs");
  const form = new DossierFormSection(page, "Faire part de mon intérêt");
  await form.fillContact();
  await form.submit();
  await form.expectSuccess();
  expect(calls).toHaveLength(1);
  expect(calls[0]).toMatchObject({ type: "INVESTISSEUR", contactEmail: "test@example.com" });
});

test("Trading · Gestion : le bouton révèle le formulaire, qui envoie le bon type de dossier", async ({ page }) => {
  const calls = await mockDossiersApi(page);
  await page.goto("/trading/gestion");
  await expect(page.getByRole("heading", { name: "Simuler ma gestion de capital" })).not.toBeVisible();
  await page.getByRole("button", { name: "Simuler ma capital" }).click();
  const form = new DossierFormSection(page, "Simuler ma gestion de capital");
  await expect(form.form).toBeVisible();
  await form.fillContact();
  await form.submit();
  await form.expectSuccess();
  expect(calls[0]).toMatchObject({ type: "FORMATION_TRADING" });
});

test("Trading · Académie : accessible uniquement depuis la carte dédiée, formulaire visible d'emblée", async ({ page }) => {
  const calls = await mockDossiersApi(page);
  await page.goto("/trading");
  await expect(page.getByText("Ce que vous allez apprendre")).toHaveCount(0);
  await page.getByRole("link", { name: /apprendre à trader vous-même/i }).click();
  await expect(page).toHaveURL(/\/trading\/academie$/);
  const form = new DossierFormSection(page, "Rejoindre l'académie");
  await form.fillContact();
  await form.submit();
  await form.expectSuccess();
  expect(calls[0]).toMatchObject({ type: "FORMATION_TRADING" });
});

test("Marché financier : l'article mène aux deux espaces", async ({ page }) => {
  await page.goto("/marche-financier");
  await page.getByRole("link", { name: "Espace Entreprises" }).first().click();
  await expect(page).toHaveURL(/\/marche-financier\/entreprises$/);
  await expect(page.getByRole("heading", { name: "Présenter mon projet" })).toBeVisible();
  await page.goto("/marche-financier");
  await page.getByRole("link", { name: /Ouvrir l'Espace Investisseurs/ }).click();
  await expect(page).toHaveURL(/\/marche-financier\/investisseurs$/);
  await expect(page.getByRole("heading", { name: "Faire part de mon intérêt" })).toBeVisible();
});

test("Conseil fiscal : le nom du commerce est obligatoire", async ({ page }) => {
  const calls = await mockDossiersApi(page);
  await page.goto("/conseil-fiscal");
  const form = new DossierFormSection(page, "Choisir mon abonnement");
  await form.fillContact();
  await form.submit();
  await expect(form.field("Nom du commerce / de l'activité")).toHaveJSProperty("validity.valueMissing", true);
  expect(calls).toHaveLength(0);
  await form.field("Nom du commerce / de l'activité").fill("Boutique test");
  await form.submit();
  await form.expectSuccess();
  expect(calls[0]).toMatchObject({ type: "CONSEIL_FISCAL", entrepriseNom: "Boutique test" });
});

test("Échec du serveur : message d'erreur, le formulaire reste rempli", async ({ page }) => {
  await mockDossiersApi(page, 500);
  await page.goto("/marche-financier/investisseurs");
  const form = new DossierFormSection(page, "Faire part de mon intérêt");
  await form.fillContact();
  await form.submit();
  await expect(form.form.getByRole("alert")).toContainText("Une erreur est survenue");
  await expect(form.field("E-mail")).toHaveValue("test@example.com");
});
