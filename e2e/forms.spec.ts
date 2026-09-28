import { expect, test } from "@playwright/test";
import { DossierFormSection, mockDossiersApi } from "./pages/DossierFormSection";

test("Investisseur : envoi réussi, données transmises, confirmation affichée", async ({ page }) => {
  const calls = await mockDossiersApi(page);
  await page.goto("/marche-financier");
  const form = new DossierFormSection(page, "Faire part de mon intérêt");
  await form.fillContact();
  await form.submit();
  await form.expectSuccess();
  expect(calls).toHaveLength(1);
  expect(calls[0]).toMatchObject({ type: "INVESTISSEUR", contactEmail: "test@example.com" });
});

test("Trading : les deux formulaires envoient le bon type de dossier", async ({ page }) => {
  const calls = await mockDossiersApi(page);
  await page.goto("/trading");
  for (const title of ["Simuler ma gestion de capital", "Rejoindre l'académie"]) {
    const form = new DossierFormSection(page, title);
    await form.fillContact();
    await form.submit();
  }
  await expect(page.getByRole("status").filter({ hasText: "Demande envoyée avec succès" })).toHaveCount(2);
  expect(calls.map((c) => (c as { type: string }).type)).toEqual(["FORMATION_TRADING", "FORMATION_TRADING"]);
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
  await page.goto("/marche-financier");
  const form = new DossierFormSection(page, "Faire part de mon intérêt");
  await form.fillContact();
  await form.submit();
  await expect(form.form.getByRole("alert")).toContainText("Une erreur est survenue");
  await expect(form.field("E-mail")).toHaveValue("test@example.com");
});
